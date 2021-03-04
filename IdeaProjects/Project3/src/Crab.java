import processing.core.PImage;
import java.util.List;
import java.util.Optional;

public class Crab extends Movable{


    public Crab(String id, Point position,
                      int actionPeriod, int animationPeriod, List<PImage> images){
        super(id, position, images, actionPeriod, animationPeriod);
    }

    public void executeActivity(WorldModel world,
                                    ImageStore imageStore, EventScheduler scheduler)
    {
        Optional<Entity> crabTarget = world.findNearest(
                this.position, Sgrass.class);
        long nextPeriod = this.getActionPeriod();

        if (crabTarget.isPresent())
        {
            Point tgtPos = crabTarget.get().position;

            if (this.moveTo(world, crabTarget.get(), scheduler))
            {
                Quake quake = new Quake(tgtPos,
                        imageStore.getImageList(Functions.QUAKE_KEY));

                world.addEntity(quake);
                nextPeriod += this.getActionPeriod();
                quake.scheduleActions(scheduler, world, imageStore);
            }
        }

        scheduler.scheduleEvent(this,
                new Activity(this, world, imageStore),
                nextPeriod);
    }

    public void moveToEntity(WorldModel world,
                             Entity target, EventScheduler scheduler){
        world.removeEntity(target);
        scheduler.unscheduleAllEvents(target);
    }
    /*private boolean moveToCrab(WorldModel world,
                                 Entity target, EventScheduler scheduler)
    {
        if (this.position.adjacent(target.position))
        {
            world.removeEntity(target);
            scheduler.unscheduleAllEvents(target);
            return true;
        }
        else
        {
            Point nextPos = this.nextPositionCrab(world, target.position);

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

    protected Point nextPosition(WorldModel world,
                                   Point destPos)
    {
        int horiz = Integer.signum(destPos.x - this.position.x);
        Point newPos = new Point(this.position.x + horiz,
                this.position.y);

        Optional<Entity> occupant = world.getOccupant(newPos);

        if (horiz == 0 ||
                (occupant.isPresent() && !(occupant.get() instanceof Fish)))
        {
            int vert = Integer.signum(destPos.y - this.position.y);
            newPos = new Point(this.position.x, this.position.y + vert);
            occupant = world.getOccupant(newPos);

            if (vert == 0 ||
                    (occupant.isPresent() && !(occupant.get() instanceof Fish)))
            {
                newPos = this.position;
            }
        }

        return newPos;
    }
}
