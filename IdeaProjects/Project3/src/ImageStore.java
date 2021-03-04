import java.util.*;

import processing.core.PApplet;
import processing.core.PImage;

/*
ImageStore: to ideally keep track of the images used in our virtual world
 */

final class ImageStore
{
   private final Map<String, List<PImage>> images;
   private final List<PImage> defaultImages;

   public ImageStore(PImage defaultImage)
   {
      this.images = new HashMap<>();
      defaultImages = new LinkedList<>();
      defaultImages.add(defaultImage);
   }

   public List<PImage> getImageList(String key)
   {
      return this.images.getOrDefault(key, this.defaultImages);
   }

   public void loadImages(Scanner in, PApplet screen)
   {
      int lineNumber = 0;
      while (in.hasNextLine())
      {
         try
         {
            this.processImageLine(in.nextLine(), screen);
         }
         catch (NumberFormatException e)
         {
            System.out.println(String.format("Image format error on line %d",
                    lineNumber));
         }
         lineNumber++;
      }
   }

   private void processImageLine(String line, PApplet screen)
   {
      String[] attrs = line.split("\\s");
      if (attrs.length >= 2)
      {
         String key = attrs[0];
         PImage img = screen.loadImage(attrs[1]);
         if (img != null && img.width != -1)
         {
            List<PImage> imgs = this.getImages(key);
            imgs.add(img);

            if (attrs.length >= Functions.KEYED_IMAGE_MIN)
            {
               int r = Integer.parseInt(attrs[Functions.KEYED_RED_IDX]);
               int g = Integer.parseInt(attrs[Functions.KEYED_GREEN_IDX]);
               int b = Integer.parseInt(attrs[Functions.KEYED_BLUE_IDX]);
               setAlpha(img, screen.color(r, g, b), 0);
            }
         }
      }
   }

   private List<PImage> getImages(String key)
   {
      List<PImage> imgs = this.images.get(key);
      if (imgs == null)
      {
         imgs = new LinkedList<>();
         this.images.put(key, imgs);
      }
      return imgs;
   }

   private void setAlpha(PImage img, int maskColor, int alpha)
   {
      int alphaValue = alpha << 24;
      int nonAlpha = maskColor & Functions.COLOR_MASK;
      img.format = PApplet.ARGB;
      img.loadPixels();
      for (int i = 0; i < img.pixels.length; i++)
      {
         if ((img.pixels[i] & Functions.COLOR_MASK) == nonAlpha)
         {
            img.pixels[i] = alphaValue | nonAlpha;
         }
      }
      img.updatePixels();
   }
}
