public class Animation extends Action{
    private int repeatCount;
    public Animation(Entity entity, int repeatCount)
    {
        super(entity);
        this.repeatCount = repeatCount;
    }

    protected void executeAction(EventScheduler scheduler)
    {
        this.getEntity().nextImage();

        if (this.repeatCount != 1)
        {
            scheduler.scheduleEvent(this.getEntity(),
                    new Animation(this.getEntity(),
                            Math.max(this.repeatCount - 1, 0)),
                    this.getEntity().getAnimationPeriod());
        }
    }
}
