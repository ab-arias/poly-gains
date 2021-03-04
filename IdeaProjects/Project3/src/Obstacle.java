import processing.core.PImage;
import java.util.List;


public class Obstacle extends Entity{

    public Obstacle(String id, Point position,
                                  List<PImage> images) {
        super(id, position, images);
    }

    protected void executeActivity(WorldModel world,
                         ImageStore imageStore, EventScheduler scheduler) {
    }

    protected int getAnimationPeriod() {
        throw new UnsupportedOperationException(
                String.format("getAnimationPeriod not supported for %s",
                        this.getClass()));
    }

    protected int getActionPeriod(){ return 0;}

    protected void scheduleActions(EventScheduler scheduler, WorldModel worldModel, ImageStore imageStore){}
}
