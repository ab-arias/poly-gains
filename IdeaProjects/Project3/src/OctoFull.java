import processing.core.PImage;

import java.util.List;
import java.util.Optional;

public class OctoFull extends Octo{

    public OctoFull(String id, int resourceLimit,
                          Point position, int actionPeriod, int animationPeriod,
                          List<PImage> images) {
        super(id, position, images, resourceLimit, resourceLimit, actionPeriod, animationPeriod);
    }

    public void executeActivity(WorldModel world,
                                        ImageStore imageStore, EventScheduler scheduler)
    {
        Optional<Entity> fullTarget = world.findNearest(this.position,
                Atlantis.class);

        if (fullTarget.isPresent() &&
                this.moveTo(world, fullTarget.get(), scheduler))
        {
            //at atlantis trigger animation
            fullTarget.get().scheduleActions(scheduler, world, imageStore);

            //transform to unfull
            this.transformFull(world, scheduler, imageStore);
        }
        else
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

    private void transformFull(WorldModel world,
                                 EventScheduler scheduler, ImageStore imageStore)
    {
        OctoNotFull octo = new OctoNotFull(this.getId(), this.getResourceLimit(),
                this.position, this.getActionPeriod(), this.getAnimationPeriod(),
                this.getImages());

        world.removeEntity(this);
        scheduler.unscheduleAllEvents(this);

        world.addEntity(octo);
        octo.scheduleActions(scheduler, world, imageStore);
    }

    protected void moveToEntity(WorldModel world, Entity target, EventScheduler scheduler){}
    /*protected boolean moveToFull(WorldModel world,
                                 Entity target, EventScheduler scheduler)
    {
        if (this.position.adjacent(target.position))
        {
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
