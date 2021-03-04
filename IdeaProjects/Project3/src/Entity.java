import java.util.List;
import java.util.Optional;

import processing.core.PImage;

/*
Entity ideally would includes functions for how all the entities in our virtual world might act...
 */


public abstract class Entity
{
   /*private final EntityKind kind;*/
   private final String id;
   public Point position;
   private final List<PImage> images;
   public int imageIndex;
   /*private final int resourceLimit;
   private int resourceCount;
   private final int actionPeriod;
   private final int animationPeriod;*/

   public Entity(/*EntityKind kind, */String id, Point position,
      List<PImage> images /*int resourceLimit, int resourceCount,
      int actionPeriod, int animationPeriod*/)
   {
      /*this.kind = kind;*/
      this.id = id;
      this.position = position;
      this.images = images;
      this.imageIndex = 0;
      /*this.resourceLimit = resourceLimit;
      this.resourceCount = resourceCount;
      this.actionPeriod = actionPeriod;
      this.animationPeriod = animationPeriod;*/
   }

   /*public EntityKind getEntityKind()
   {
      return kind;
   }*/

   public PImage getCurrentImage()
   {
      return images.get(imageIndex);
   }

   public List<PImage> getImages() {
      return images;
   }

   public String getId() { return id;}

   protected abstract int getAnimationPeriod();

   protected abstract int getActionPeriod();
   /*{
      return actionPeriod;
   }*/

   /*public int getResourceCount(){ return resourceCount;}

   public void setResourceCount(int resourceCount){ this.resourceCount = resourceCount;}

   public int getResourceLimit(){ return resourceLimit;}

   public int getAnimationPeriod() {
      return animationPeriod;
   }*/
      /*switch (this.kind)
      {
         case OCTO_FULL:
         case OCTO_NOT_FULL:
         case CRAB:
         case QUAKE:
         case ATLANTIS:
            return this.animationPeriod;
         default:
            throw new UnsupportedOperationException(
                    String.format("getAnimationPeriod not supported for %s",
                            this.getClass()));
      }*/

   public void nextImage()
   {
      this.imageIndex = (this.imageIndex + 1) % this.images.size();
   }

   protected abstract void executeActivity(WorldModel world,
                                              ImageStore imageStore, EventScheduler scheduler);



   protected abstract void scheduleActions(EventScheduler scheduler, WorldModel world, ImageStore imageStore);
}
   /*{
      Optional<Entity> fullTarget = world.findNearest(this.position,
              EntityKind.ATLANTIS);

      if (fullTarget.isPresent() &&
              this.moveToFull(world, fullTarget.get(), scheduler))
      {
         //at atlantis trigger animation
         scheduler.scheduleActions(fullTarget.get(), world, imageStore);

         //transform to unfull
         this.transformFull(world, scheduler, imageStore);
      }
      else
      {
         scheduler.scheduleEvent(this,
                 Action.createActivityAction(this, world, imageStore),
                 this.actionPeriod);
      }
   }

   public void executeOctoNotFullActivity(WorldModel world, ImageStore imageStore, EventScheduler scheduler)
   {
      Optional<Entity> notFullTarget = world.findNearest(this.position,
              EntityKind.FISH);

      if (!notFullTarget.isPresent() ||
              !this.moveToNotFull(world, notFullTarget.get(), scheduler) ||
              !this.transformNotFull(world, scheduler, imageStore))
      {
         scheduler.scheduleEvent(this,
                 Action.createActivityAction(this, world, imageStore),
                 this.actionPeriod);
      }
   }

   public void executeFishActivity(WorldModel world,
                                          ImageStore imageStore, EventScheduler scheduler)
   {
      Point pos = this.position;  // store current position before removing

      world.removeEntity(this);
      scheduler.unscheduleAllEvents(this);

      Entity crab = WorldModel.createCrab(this.id + Functions.CRAB_ID_SUFFIX,
              pos, this.actionPeriod / Functions.CRAB_PERIOD_SCALE,
              Functions.CRAB_ANIMATION_MIN +
                      Functions.rand.nextInt(Functions.CRAB_ANIMATION_MAX - Functions.CRAB_ANIMATION_MIN),
              imageStore.getImageList(Functions.CRAB_KEY));

      world.addEntity(crab);
      scheduler.scheduleActions(crab, world, imageStore);
   }

   public void executeCrabActivity(WorldModel world,
                                          ImageStore imageStore, EventScheduler scheduler)
   {
      Optional<Entity> crabTarget = world.findNearest(
              this.position, EntityKind.SGRASS);
      long nextPeriod = this.actionPeriod;

      if (crabTarget.isPresent())
      {
         Point tgtPos = crabTarget.get().position;

         if (this.moveToCrab(world, crabTarget.get(), scheduler))
         {
            Entity quake = WorldModel.createQuake(tgtPos,
                    imageStore.getImageList(Functions.QUAKE_KEY));

            world.addEntity(quake);
            nextPeriod += this.actionPeriod;
            scheduler.scheduleActions(quake, world, imageStore);
         }
      }

      scheduler.scheduleEvent(this,
              Action.createActivityAction(this, world, imageStore),
              nextPeriod);
   }

   public void executeQuakeActivity(WorldModel world,
                                           ImageStore imageStore, EventScheduler scheduler)
   {
      scheduler.unscheduleAllEvents(this);
      world.removeEntity(this);
   }

   public void executeAtlantisActivity(WorldModel world,
                                              ImageStore imageStore, EventScheduler scheduler)
   {
      scheduler.unscheduleAllEvents(this);
      world.removeEntity(this);
   }

   public void executeSgrassActivity(WorldModel world,
                                            ImageStore imageStore, EventScheduler scheduler)
   {
      Optional<Point> openPt = world.findOpenAround(this.position);

      if (openPt.isPresent())
      {
         Entity fish = WorldModel.createFish(Functions.FISH_ID_PREFIX + this.id,
                 openPt.get(), Functions.FISH_CORRUPT_MIN +
                         Functions.rand.nextInt(Functions.FISH_CORRUPT_MAX - Functions.FISH_CORRUPT_MIN),
                 imageStore.getImageList(Functions.FISH_KEY));
         world.addEntity(fish);
         scheduler.scheduleActions(fish, world, imageStore);
      }

      scheduler.scheduleEvent(this,
              Action.createActivityAction(this, world, imageStore),
              this.actionPeriod);
   }*/

   /*protected boolean transformNotFull(WorldModel world,
                                          EventScheduler scheduler, ImageStore imageStore)
   {
      if (this.resourceCount >= this.resourceLimit)
      {
         OctoFull octo = new OctoFull(this.id, this.resourceLimit,
                 this.position, this.actionPeriod, this.animationPeriod,
                 this.images);

         world.removeEntity(this);
         scheduler.unscheduleAllEvents(this);

         world.addEntity(octo);
         octo.scheduleActions(scheduler, world, imageStore);

         return true;
      }

      return false;
   }*/

   /*protected void transformFull(WorldModel world,
                                    EventScheduler scheduler, ImageStore imageStore)
   {
      OctoNotFull octo = new OctoNotFull(this.id, this.resourceLimit,
              this.position, this.actionPeriod, this.animationPeriod,
              this.images);

      world.removeEntity(this);
      scheduler.unscheduleAllEvents(this);

      world.addEntity(octo);
      octo.scheduleActions(scheduler, world, imageStore);
   }*/

   /*protected boolean moveToNotFull(WorldModel world,
                                       Entity target, EventScheduler scheduler)
   {
      if (this.position.adjacent(target.position))
      {
         resourceCount += 1;
         world.removeEntity(target);
         scheduler.unscheduleAllEvents(target);

         return true;
      }
      else
      {
         Point nextPos = this.nextPositionOcto(world, target.position);

         if (!this.position.equals(nextPos))
         {
            Optional<Entity> occupant = world.getOccupant(nextPos);
            if (occupant.isPresent())
            {
               scheduler.unscheduleAllEvents(occupant.get());
            }

            world.moveEntity(this, nextPos);
         }
         return false;
      }
   }*/

   /*protected boolean moveToFull(WorldModel world,
                                    Entity target, EventScheduler scheduler)
   {
      if (this.position.adjacent(target.position))
      {
         return true;
      }
      else
      {
         Point nextPos = this.nextPositionOcto(world, target.position);

         if (!this.position.equals(nextPos))
         {
            Optional<Entity> occupant = world.getOccupant(nextPos);
            if (occupant.isPresent())
            {
               scheduler.unscheduleAllEvents(occupant.get());
            }

            world.moveEntity(this, nextPos);
         }
         return false;
      }
   }*/
   /*protected boolean moveToCrab(WorldModel world,
                                    Entity target, EventScheduler scheduler)
   {
      if (this.position.adjacent(target.position))
      {
         world.removeEntity(target);
         scheduler.unscheduleAllEvents(target);
         return true;
      }
      else
      {
         Point nextPos = this.nextPositionCrab(world, target.position);

         if (!this.position.equals(nextPos))
         {
            Optional<Entity> occupant = world.getOccupant(nextPos);
            if (occupant.isPresent())
            {
               scheduler.unscheduleAllEvents(occupant.get());
            }

            world.moveEntity(this, nextPos);
         }
         return false;
      }
   }*/

   /*private Point nextPositionOcto(WorldModel world,
                                        Point destPos)
   {
      int horiz = Integer.signum(destPos.x - this.position.x);
      Point newPos = new Point(this.position.x + horiz,
              this.position.y);

      if (horiz == 0 || world.isOccupied(newPos))
      {
         int vert = Integer.signum(destPos.y - this.position.y);
         newPos = new Point(this.position.x,
                 this.position.y + vert);

         if (vert == 0 || world.isOccupied(newPos))
         {
            newPos = this.position;
         }
      }

      return newPos;
   }*/

   /*private Point nextPositionCrab(WorldModel world,
                                        Point destPos)
   {
      int horiz = Integer.signum(destPos.x - this.position.x);
      Point newPos = new Point(this.position.x + horiz,
              this.position.y);

      Optional<Entity> occupant = world.getOccupant(newPos);

      if (horiz == 0 ||
              (occupant.isPresent() && !(occupant.get() instanceof Fish)))
      {
         int vert = Integer.signum(destPos.y - this.position.y);
         newPos = new Point(this.position.x, this.position.y + vert);
         occupant = world.getOccupant(newPos);

         if (vert == 0 ||
                 (occupant.isPresent() && !(occupant.get() instanceof Fish)))
         {
            newPos = this.position;
         }
      }

      return newPos;
   }*/

