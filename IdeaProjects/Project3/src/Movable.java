import processing.core.PImage;
import java.util.List;
import java.util.Optional;

public abstract class Movable extends AnimationEntity{
    public Movable(String id,
                Point position, List<PImage> images, int actionPeriod, int animationPeriod) {
        super(id, position, actionPeriod, animationPeriod, images);
    }

    /*public int getAnimationPeriod() {
        return animationPeriod;
    }

    public int getActionPeriod() { return actionPeriod;}*/

    /*public void scheduleActions(EventScheduler scheduler, WorldModel world, ImageStore imageStore)
    {
        scheduler.scheduleEvent(this,
                new Activity(this, world, imageStore),
                this.getActionPeriod());
        scheduler.scheduleEvent(this, new Animation(this, 0),
                this.getAnimationPeriod());
    }*/

    protected boolean moveTo(WorldModel world,
                             Entity target, EventScheduler scheduler)
    {
        if (this.position.adjacent(target.position))
        {
            moveToEntity(world, target, scheduler);
            return true;
        }
        else
        {
            Point nextPos = this.nextPosition(world, target.position);

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
    }

    protected abstract Point nextPosition(WorldModel world,
                                          Point destPos);

    protected abstract void moveToEntity(WorldModel world,
                                         Entity target, EventScheduler scheduler);
}
