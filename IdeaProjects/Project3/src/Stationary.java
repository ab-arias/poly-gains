import processing.core.PImage;

import java.util.List;

public class Stationary extends AnimationEntity{
    private final int repeatCount;
    public Stationary(String id, Point position, int actionPeriod, int animationPeriod,
                      List<PImage> images, int repeatCount){
        super(id, position, actionPeriod, animationPeriod, images);
        this.repeatCount = repeatCount;
    }

    public int getRepeatCount() {
        return repeatCount;
    }

    protected void executeActivity(WorldModel world,
                                   ImageStore imageStore, EventScheduler scheduler)
    {
        scheduler.unscheduleAllEvents(this);
        world.removeEntity(this);
    }

    protected void scheduleActions(EventScheduler scheduler, WorldModel world, ImageStore imageStore){
        if (!(this.getClass() == Atlantis.class)){
            super.scheduleActions(scheduler, world, imageStore);
        }
        scheduler.scheduleEvent(this,
                new Animation(this, repeatCount),
                this.getAnimationPeriod());
    }
}
