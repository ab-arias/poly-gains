import processing.core.PImage;
import java.util.List;
import java.util.Optional;

public abstract class Octo extends Movable{
    private final int resourceLimit;
    private int resourceCount;

    public Octo(String id,
                    Point position, List<PImage> images, int resourceLimit, int resourceCount, int actionPeriod, int animationPeriod) {
        super(id, position, images, actionPeriod, animationPeriod);
        this.resourceLimit = resourceLimit;
        this.resourceCount = resourceCount;
    }

    protected int getResourceLimit() { return resourceLimit;}

    protected int getResourceCount() { return resourceCount;}

    protected void setResourceCount(int resourceCount){ this.resourceCount = resourceCount;}

    protected Point nextPosition(WorldModel world,
                                   Point destPos)
    {
        int horiz = Integer.signum(destPos.x - this.position.x);
        Point newPos = new Point(this.position.x + horiz,
                this.position.y);

        if (horiz == 0 || world.isOccupied(newPos))
        {
            int vert = Integer.signum(destPos.y - this.position.y);
            newPos = new Point(this.position.x,
                    this.position.y + vert);

            if (vert == 0 || world.isOccupied(newPos))
            {
                newPos = this.position;
            }
        }

        return newPos;
    }

}
