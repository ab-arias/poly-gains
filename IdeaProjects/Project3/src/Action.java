/*
Action: ideally what our various entities might do in our virutal world
 */

public abstract class Action
{
   private final Entity entity;
   /*private final WorldModel world;
   private final ImageStore imageStore;
   private final int repeatCount;*/

   public Action(Entity entity/*, WorldModel world,
      ImageStore imageStore, int repeatCount*/)
   {
      this.entity = entity;
      /*this.world = world;
      this.imageStore = imageStore;
      this.repeatCount = repeatCount;*/
   }

   public Entity getEntity(){return entity;}

   /*public WorldModel getWorldModel(){return world;}

   public ImageStore getImageStore(){return imageStore;}

   public int getRepeatCount(){return repeatCount;}*/

   protected abstract void executeAction(EventScheduler scheduler);
   /*{
      switch (this.kind)
      {
         case ACTIVITY:
            this.executeActivityAction(scheduler);
            break;

         case ANIMATION:
            this.executeAnimationAction(scheduler);
            break;
      }
   }*/

   /*private void executeAnimationAction(EventScheduler scheduler)
   {
      this.entity.nextImage();

      if (this.repeatCount != 1)
      {
         scheduler.scheduleEvent(this.entity,
                 createAnimationAction(this.entity,
                         Math.max(this.repeatCount - 1, 0)),
                 this.entity.getAnimationPeriod());
      }
   }*/

   /*private void executeActivityAction(EventScheduler scheduler){
      if (this.entity.getClass() == OctoFull.class) {
         OctoFull octoF = (OctoFull) this.entity;
         octoF.executeActivity(this.world,
                 this.imageStore, scheduler);
      }
      else if (this.entity.getClass() == OctoNotFull.class) {
         OctoNotFull octoNF = (OctoNotFull) this.entity;
         octoNF.executeActivity(this.world,
                 this.imageStore, scheduler);
      }
      else if (this.entity.getClass() == Fish.class) {
         Fish fish = (Fish) this.entity;
         fish.executeActivity(this.world, this.imageStore,
                 scheduler);
      }
      else if (this.entity.getClass() == Crab.class) {
         Crab crab = (Crab) this.entity;
         crab.executeActivity(this.world,
                 this.imageStore, scheduler);
      }
      else if (this.entity.getClass() == Quake.class) {
         Quake quake = (Quake) this.entity;
         quake.executeActivity(this.world, this.imageStore,
                 scheduler);
      }
      else if (this.entity.getClass() == Sgrass.class) {
         Sgrass sgrass = (Sgrass) this.entity;
         sgrass.executeActivity(this.world, this.imageStore,
                 scheduler);
      }
      else if (this.entity.getClass() == Atlantis.class) {
         Atlantis atlantis = (Atlantis) this.entity;
         atlantis.executeActivity(this.world, this.imageStore,
                 scheduler);
      }
      else
         throw new UnsupportedOperationException(
                 String.format("executeActivityAction not supported for %s",
                         this.entity.getClass()));
   }*/
      /*switch (this.entity.getEntityKind())
      {
         case OCTO_FULL:
            this.entity.executeOctoFullActivity(this.world,
                    this.imageStore, scheduler);
            break;

         case OCTO_NOT_FULL:
            this.entity.executeOctoNotFullActivity(this.world,
                    this.imageStore, scheduler);
            break;

         case FISH:
            this.entity.executeFishActivity(this.world, this.imageStore,
                    scheduler);
            break;

         case CRAB:
            this.entity.executeCrabActivity(this.world,
                    this.imageStore, scheduler);
            break;

         case QUAKE:
            this.entity.executeQuakeActivity(this.world, this.imageStore,
                    scheduler);
            break;

         case SGRASS:
            this.entity.executeSgrassActivity(this.world, this.imageStore,
                    scheduler);
            break;

         case ATLANTIS:
            this.entity.executeAtlantisActivity(this.world, this.imageStore,
                    scheduler);
            break;

         default:
            throw new UnsupportedOperationException(
                    String.format("executeActivityAction not supported for %s",
                            this.entity.getEntityKind()));
      }
   }*/

   /*public static Action createAnimationAction(Entity entity, int repeatCount)
   {
      return new Animation(entity, repeatCount);
   }

   public static Action createActivityAction(Entity entity, WorldModel world,
                                      ImageStore imageStore)
   {
      return new Activity(entity, world, imageStore);
   }*/
}
