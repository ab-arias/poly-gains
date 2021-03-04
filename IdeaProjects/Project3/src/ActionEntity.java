import processing.core.PImage;

import java.util.List;

public abstract class ActionEntity extends Entity{
    private final int actionPeriod;
    public ActionEntity(String id, Point position, int actionPeriod,
                        List<PImage> images){
        super(id, position, images);
        this.actionPeriod = actionPeriod;
    }

    protected int getActionPeriod() { return actionPeriod;}


    protected void scheduleActions(EventScheduler scheduler, WorldModel world, ImageStore imageStore)
    {
        scheduler.scheduleEvent(this,
                new Activity(this, world, imageStore),
                this.actionPeriod);
    }
}

