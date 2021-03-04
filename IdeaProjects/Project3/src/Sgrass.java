import processing.core.PImage;

import java.util.List;
import java.util.Optional;

public class Sgrass extends ActionEntity{

    public Sgrass(String id, Point position, int actionPeriod,
                 List<PImage> images){
        super(id, position, actionPeriod, images);
    }

    public void executeActivity(WorldModel world,
                                      ImageStore imageStore, EventScheduler scheduler)
    {
        Optional<Point> openPt = world.findOpenAround(this.position);

        if (openPt.isPresent())
        {
            Fish fish = new Fish(Functions.FISH_ID_PREFIX + this.getId(),
                    openPt.get(), Functions.FISH_CORRUPT_MIN +
                            Functions.rand.nextInt(Functions.FISH_CORRUPT_MAX - Functions.FISH_CORRUPT_MIN),
                    imageStore.getImageList(Functions.FISH_KEY));
            world.addEntity(fish);
            fish.scheduleActions(scheduler, world, imageStore);
        }

        scheduler.scheduleEvent(this,
                new Activity(this, world, imageStore),
                this.getActionPeriod());
    }

    protected int getAnimationPeriod() {
        throw new UnsupportedOperationException(
                String.format("getAnimationPeriod not supported for %s",
                        this.getClass()));
    }

    /*public void scheduleActions(EventScheduler scheduler, WorldModel world, ImageStore imageStore)
    {
        scheduler.scheduleEvent(this,
                new Activity(this, world, imageStore),
                this.actionPeriod);
    }*/
}
