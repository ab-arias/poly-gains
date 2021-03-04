import processing.core.PImage;

import java.util.List;

public class Atlantis extends Stationary{
    public Atlantis(String id, Point position,
                    List<PImage> images) {
        super(id, position, 0, 0, images, Functions.ATLANTIS_ANIMATION_REPEAT_COUNT);
    }

    /*public void executeActivity(WorldModel world,
                                        ImageStore imageStore, EventScheduler scheduler)
    {
        scheduler.unscheduleAllEvents(this);
        world.removeEntity(this);
    }*/

    /*public void scheduleActions(EventScheduler scheduler, WorldModel world, ImageStore imageStore)
    {
        scheduler.scheduleEvent(this,
                new Animation(this, Functions.ATLANTIS_ANIMATION_REPEAT_COUNT),
                this.getAnimationPeriod());
    }*/
}
