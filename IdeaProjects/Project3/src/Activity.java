public class Activity extends Action{
    private final WorldModel world;
    private final ImageStore imageStore;
    public Activity(Entity entity, WorldModel world,
                  ImageStore imageStore)
    {
        super(entity);
        this.world = world;
        this.imageStore = imageStore;
    }

    protected void executeAction(EventScheduler scheduler){
        if (this.getEntity().getClass() == Obstacle.class){
            throw new UnsupportedOperationException(
                    String.format("executeActivityAction not supported for %s",
                            this.getEntity().getClass()));
        }
        else{
            this.getEntity().executeActivity(this.world,
                    this.imageStore, scheduler);
        }
    }
        /*if (this.entity.getClass() == OctoFull.class) {
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
}
