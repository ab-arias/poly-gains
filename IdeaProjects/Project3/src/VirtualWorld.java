import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import processing.core.*;

/*
VirtualWorld is our main wrapper
It keeps track of data necessary to use Processing for drawing but also keeps track of the necessary
components to make our world run (eventScheduler), the data in our world (WorldModel) and our
current view (think virtual camera) into that world (WorldView)
 */

public final class VirtualWorld
   extends PApplet
{
   public static final int TIMER_ACTION_PERIOD = 100;

   public static final int VIEW_WIDTH = 1280;
   public static final int VIEW_HEIGHT = 960;
   public static final int TILE_WIDTH = 32;
   public static final int TILE_HEIGHT = 32;
//   public static final int VIEW_WIDTH = 640;
//   public static final int VIEW_HEIGHT = 480;
//   public static final int TILE_WIDTH = 32;
//   public static final int TILE_HEIGHT = 32;
   public static final int WORLD_WIDTH_SCALE = 2;
   public static final int WORLD_HEIGHT_SCALE = 2;

   public static final int VIEW_COLS = VIEW_WIDTH / TILE_WIDTH;
   public static final int VIEW_ROWS = VIEW_HEIGHT / TILE_HEIGHT;
   public static final int WORLD_COLS = VIEW_COLS * WORLD_WIDTH_SCALE;
   public static final int WORLD_ROWS = VIEW_ROWS * WORLD_HEIGHT_SCALE;

   public static final String IMAGE_LIST_FILE_NAME = "imagelist";
   public static final String DEFAULT_IMAGE_NAME = "background_default";
   public static final int DEFAULT_IMAGE_COLOR = 0x808080;

   public static final String LOAD_FILE_NAME = "world.sav";

   public static final String FAST_FLAG = "-fast";
   public static final String FASTER_FLAG = "-faster";
   public static final String FASTEST_FLAG = "-fastest";
   public static final double FAST_SCALE = 0.5;
   public static final double FASTER_SCALE = 0.25;
   public static final double FASTEST_SCALE = 0.10;
   public static double timeScale = 1.0;
   public static int injectionCount = 1;
   public static int count = 0;
   public static boolean nextPressed;
   public static int timePressed;

   private ImageStore imageStore;
   private WorldModel world;
   private WorldView view;
   private EventScheduler scheduler;

   private long next_time;

   public void settings()
   {
      size(VIEW_WIDTH, VIEW_HEIGHT);
   }

   /*
      Processing entry point for "sketch" setup.
   */
   public void setup()
   {
      this.imageStore = new ImageStore(
         createImageColored(TILE_WIDTH, TILE_HEIGHT, DEFAULT_IMAGE_COLOR));
      this.world = new WorldModel(WORLD_ROWS, WORLD_COLS,
         createDefaultBackground(imageStore));
      this.view = new WorldView(VIEW_ROWS, VIEW_COLS, this, world,
         TILE_WIDTH, TILE_HEIGHT);
      this.scheduler = new EventScheduler(timeScale);

      loadImages(IMAGE_LIST_FILE_NAME, imageStore, this);
      loadWorld(world, LOAD_FILE_NAME, imageStore);

      scheduleActions(world, scheduler, imageStore);

      next_time = System.currentTimeMillis() + TIMER_ACTION_PERIOD;
      nextPressed = false;
      timePressed = millis() + 100;
   }

   public void draw()
   {
      long time = System.currentTimeMillis();
      if (time >= next_time)
      {
         this.scheduler.updateOnTime(time);
         next_time = time + TIMER_ACTION_PERIOD;
      }
      if (millis() > timePressed){
         nextPressed = !nextPressed;
         timePressed = millis() + 500;
      }
      view.drawViewport();
   }

   public void mousePressed(){
         count++;
         System.out.println(count);
         Injection injection = new Injection(new Point(mouseX/TILE_WIDTH, mouseY/TILE_HEIGHT), imageStore.getImageList(Functions.INJECTION_KEY));
         //injection.executeActivity(world, imageStore, scheduler);
         world.addEntity(injection);
         injection.scheduleActions(scheduler, world, imageStore);
   }

   public void keyPressed()
   {
      if(nextPressed){
         return;
      }
         if (key == CODED) {
//         int dx = 0;
//         int dy = 0;

            switch (keyCode) {
               case UP:
//               dy = -1;
                  for (Entity e : world.getEntities()) {
                     if (e instanceof Hero) {
                        e.setPosition(new Point(e.position.x, e.position.y - 1));
                     }
                  }
                  break;
               case DOWN:
//               dy = 1;
                  for (Entity e : world.getEntities()) {
                     if (e instanceof Hero) {
                        e.setPosition(new Point(e.position.x, e.position.y + 1));
                     }
                  }
                  break;
               case LEFT:
//               dx = -1;
                  for (Entity e : world.getEntities()) {
                     if (e instanceof Hero) {
                        e.setPosition(new Point(e.position.x - 1, e.position.y));
                     }
                  }
                  break;
               case RIGHT:
//               dx = 1;
                  for (Entity e : world.getEntities()) {
                     if (e instanceof Hero) {
                        e.setPosition(new Point(e.position.x + 1, e.position.y));
                     }
                  }
                  break;
            }
//         view.shiftView(dx, dy);
         }
   }

   private Background createDefaultBackground(ImageStore imageStore)
   {
      return new Background(DEFAULT_IMAGE_NAME,
              imageStore.getImageList(DEFAULT_IMAGE_NAME));
   }

   private PImage createImageColored(int width, int height, int color)
   {
      PImage img = new PImage(width, height, RGB);
      img.loadPixels();
      for (int i = 0; i < img.pixels.length; i++)
      {
         img.pixels[i] = color;
      }
      img.updatePixels();
      return img;
   }

   private void loadImages(String filename, ImageStore imageStore,
      PApplet screen)
   {
      try
      {
         Scanner in = new Scanner(new File(filename));
         imageStore.loadImages(in, screen);
      }
      catch (FileNotFoundException e)
      {
         System.err.println(e.getMessage());
      }
   }

   private void loadWorld(WorldModel world, String filename,
      ImageStore imageStore)
   {
      try
      {
         Scanner in = new Scanner(new File(filename));
         load(in, world, imageStore);
      }
      catch (FileNotFoundException e)
      {
         System.err.println(e.getMessage());
      }
   }

   private void scheduleActions(WorldModel world,
      EventScheduler scheduler, ImageStore imageStore)
   {
      for (Entity entity : world.getEntities())
      {
         //Only start actions for entities that include action (not those with just animations)
         if (entity.getActionPeriod() > 0)
            entity.scheduleActions(scheduler, world, imageStore);
      }
   }

   private static void parseCommandLine(String [] args)
   {
      for (String arg : args)
      {
         switch (arg)
         {
            case FAST_FLAG:
               timeScale = Math.min(FAST_SCALE, timeScale);
               break;
            case FASTER_FLAG:
               timeScale = Math.min(FASTER_SCALE, timeScale);
               break;
            case FASTEST_FLAG:
               timeScale = Math.min(FASTEST_SCALE, timeScale);
               break;
         }
      }
   }

   private void load(Scanner in, WorldModel world, ImageStore imageStore)
   {
      int lineNumber = 0;
      while (in.hasNextLine())
      {
         try
         {
            if (!world.processLine(in.nextLine(), world, imageStore))
            {
               System.err.println(String.format("invalid entry on line %d",
                       lineNumber));
            }
         }
         catch (NumberFormatException e)
         {
            System.err.println(String.format("invalid entry on line %d",
                    lineNumber));
         }
         catch (IllegalArgumentException e)
         {
            System.err.println(String.format("issue on line %d: %s",
                    lineNumber, e.getMessage()));
         }
         lineNumber++;
      }
   }

   public static void main(String [] args)
   {
      parseCommandLine(args);
      PApplet.main(VirtualWorld.class);
   }
}
