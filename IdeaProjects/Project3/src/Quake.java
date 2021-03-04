import processing.core.PImage;
import java.util.List;

public class Quake extends Stationary{
    public Quake(Point position, List<PImage> images){
        super(Functions.QUAKE_ID, position, Functions.QUAKE_ACTION_PERIOD, Functions.QUAKE_ANIMATION_PERIOD, images, Functions.QUAKE_ANIMATION_REPEAT_COUNT);
    }


    /*protected void executeActivity(WorldModel world,
                                     ImageStore imageStore, EventScheduler scheduler)
    {
        scheduler.unscheduleAllEvents(this);
        world.removeEntity(this);
    }*/

    /*protected void scheduleActions(EventScheduler scheduler, WorldModel world, ImageStore imageStore)
    {
        scheduler.scheduleEvent(this,
                new Activity(this, world, imageStore),
                this.getActionPeriod());
        scheduler.scheduleEvent(this,
                new Animation(this, Functions.QUAKE_ANIMATION_REPEAT_COUNT),
                this.getAnimationPeriod());
    }*/
}
