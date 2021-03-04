import processing.core.PImage;

import java.util.List;

public abstract class AnimationEntity extends ActionEntity{
    private final int animationPeriod;
    public AnimationEntity(String id, Point position, int actionPeriod, int animationPeriod,
                        List<PImage> images){
        super(id, position, actionPeriod, images);
        this.animationPeriod = animationPeriod;
    }

    protected int getAnimationPeriod() { return animationPeriod;}

    protected void scheduleActions(EventScheduler scheduler, WorldModel world, ImageStore imageStore)
    {
        super.scheduleActions(scheduler, world, imageStore);
        if (!((this.getClass() == Quake.class) || this.getClass() == Atlantis.class)){
            scheduler.scheduleEvent(this,
                    new Animation(this, 0),
                    this.getAnimationPeriod());
        }
    }

}
