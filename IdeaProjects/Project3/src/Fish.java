import processing.core.PImage;
import java.util.List;

public class Fish extends ActionEntity{
    public Fish(String id, Point position, int actionPeriod,
               List<PImage> images){
        super(id, position, actionPeriod, images);
    }


    public void executeActivity(WorldModel world,
                                    ImageStore imageStore, EventScheduler scheduler)
    {
        Point pos = this.position;  // store current position before removing

        world.removeEntity(this);
        scheduler.unscheduleAllEvents(this);

        Crab crab = new Crab(this.getId() + Functions.CRAB_ID_SUFFIX,
                pos, this.getActionPeriod() / Functions.CRAB_PERIOD_SCALE,
                Functions.CRAB_ANIMATION_MIN +
                        Functions.rand.nextInt(Functions.CRAB_ANIMATION_MAX - Functions.CRAB_ANIMATION_MIN),
                imageStore.getImageList(Functions.CRAB_KEY));

        world.addEntity(crab);
        crab.scheduleActions(scheduler, world, imageStore);
    }

    protected int getAnimationPeriod() { throw new UnsupportedOperationException(
            String.format("getAnimationPeriod not supported for %s",
                    this.getClass()));}

    /*protected void scheduleActions(EventScheduler scheduler, WorldModel world, ImageStore imageStore)
    {
        scheduler.scheduleEvent(this,
                new Activity(this, world, imageStore),
                this.getActionPeriod());
    }*/
}
