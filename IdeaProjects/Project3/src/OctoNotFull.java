import processing.core.PImage;
import java.util.List;
import java.util.Optional;

public class OctoNotFull extends Octo{

    public OctoNotFull(String id, int resourceLimit,
                             Point position, int actionPeriod, int animationPeriod,
                             List<PImage> images) {
        super(id, position, images, resourceLimit, 0, actionPeriod, animationPeriod);
    }

    public void executeActivity(WorldModel world, ImageStore imageStore, EventScheduler scheduler)
    {
        Optional<Entity> notFullTarget = world.findNearest(this.position,
                Fish.class);

        if (!notFullTarget.isPresent() ||
                !this.moveTo(world, notFullTarget.get(), scheduler) ||
                !this.transformNotFull(world, scheduler, imageStore))
        {
            scheduler.scheduleEvent(this,
                    new Activity(this, world, imageStore),
                    this.getActionPeriod());
        }
    }


    /*public void scheduleActions(EventScheduler scheduler, WorldModel world, ImageStore imageStore)
    {
        scheduler.scheduleEvent(this,
                Action.createActivityAction(this, world, imageStore),
                this.getActionPeriod());
        scheduler.scheduleEvent(this, Action.createAnimationAction(this, 0),
                this.getAnimationPeriod());
    }*/

    private boolean transformNotFull(WorldModel world,
                                       EventScheduler scheduler, ImageStore imageStore)
    {
        if (this.getResourceCount() >= this.getResourceLimit())
        {
            OctoFull octo = new OctoFull(this.getId(), this.getResourceLimit(),
                    this.position, this.getActionPeriod(), this.getAnimationPeriod(),
                    this.getImages());

            world.removeEntity(this);
            scheduler.unscheduleAllEvents(this);

            world.addEntity(octo);
            octo.scheduleActions(scheduler, world, imageStore);

            return true;
        }

        return false;
    }

    protected void moveToEntity(WorldModel world,
                                    Entity target, EventScheduler scheduler) {
        this.setResourceCount(this.getResourceCount() + 1);
        world.removeEntity(target);
        scheduler.unscheduleAllEvents(target);
    }
        /*if (this.position.adjacent(target.position))
        {
            this.setResourceCount(this.getResourceCount() + 1);
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
}
