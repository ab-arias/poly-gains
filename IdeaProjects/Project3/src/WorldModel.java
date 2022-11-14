import processing.core.PImage;

import java.util.*;

/*
WorldModel ideally keeps track of the actual size of our grid world and what is in that world
in terms of entities and background elements
 */

final class WorldModel
{
   private final int numRows;
   private final int numCols;
   private final Background background[][];
   private final Entity occupancy[][];
   private final Set<Entity> entities;

   public WorldModel(int numRows, int numCols, Background defaultBackground)
   {
      this.numRows = numRows;
      this.numCols = numCols;
      this.background = new Background[numRows][numCols];
      this.occupancy = new Entity[numRows][numCols];
      this.entities = new HashSet<>();

      for (int row = 0; row < numRows; row++)
      {
         Arrays.fill(this.background[row], defaultBackground);
      }
   }

   public int getNumRows()
   {
      return numRows;
   }

   public int getNumCols()
   {
      return numCols;
   }

   public Set<Entity> getEntities() {
      return entities;
   }

   public Optional<Point> findOpenAround(Point pos)
   {
      for (int dy = -Functions.FISH_REACH; dy <= Functions.FISH_REACH; dy++)
      {
         for (int dx = -Functions.FISH_REACH; dx <= Functions.FISH_REACH; dx++)
         {
            Point newPt = new Point(pos.x + dx, pos.y + dy);
            if (this.withinBounds(newPt) &&
                    !this.isOccupied(newPt))
            {
               return Optional.of(newPt);
            }
         }
      }

      return Optional.empty();
   }

   private boolean withinBounds(Point pos)
   {
      return pos.y >= 0 && pos.y < this.numRows &&
              pos.x >= 0 && pos.x < this.numCols;
   }

   public boolean isOccupied(Point pos)
   {
      return withinBounds(pos) &&
              this.getOccupancyCell(pos) != null;
   }

   public Optional<Entity> findNearest(Point pos,
                                              Class kind)
   {
      List<Entity> ofType = new LinkedList<>();
      for (Entity entity : this.entities)
      {
         if (entity.getClass() == kind)
         {
            ofType.add(entity);
         }
      }

      return this.nearestEntity(ofType, pos);
   }

   private void removeEntityAt(Point pos)
   {
      if (this.withinBounds(pos)
              && getOccupancyCell(pos) != null)
      {
         Entity entity = getOccupancyCell(pos);

         /* this moves the entity just outside of the grid for
            debugging purposes */
         entity.position = new Point(-1, -1);
         this.entities.remove(entity);
         setOccupancyCell(pos, null);
      }
   }

   public Optional<PImage> getBackgroundImage(Point pos)
   {
      if (this.withinBounds(pos))
      {
         return Optional.of(getBackgroundCell(pos).getCurrentImage());
      }
      else
      {
         return Optional.empty();
      }
   }

   private void setBackground(Point pos,
                                    Background background)
   {
      if (this.withinBounds(pos))
      {
         setBackgroundCell(pos, background);
      }
   }

   public Optional<Entity> getOccupant(Point pos)
   {
      if (this.isOccupied(pos))
      {
         return Optional.of(getOccupancyCell(pos));
      }
      else
      {
         return Optional.empty();
      }
   }

   private Entity getOccupancyCell(Point pos)
   {
      return this.occupancy[pos.y][pos.x];
   }

   private void setOccupancyCell(Point pos,
                                       Entity entity)
   {
      this.occupancy[pos.y][pos.x] = entity;
   }

   private Background getBackgroundCell(Point pos)
   {
      return this.background[pos.y][pos.x];
   }

   private void setBackgroundCell(Point pos,
                                        Background background)
   {
      this.background[pos.y][pos.x] = background;
   }

   public void addEntity(Entity entity)
   {
      if (this.withinBounds(entity.position))
      {
         this.setOccupancyCell(entity.position, entity);
         this.entities.add(entity);
      }
   }

   public void moveEntity(Entity entity, Point pos)
   {
      Point oldPos = entity.position;
      if (this.withinBounds(pos) && !pos.equals(oldPos))
      {
         this.setOccupancyCell(oldPos, null);
         this.removeEntityAt(pos);
         this.setOccupancyCell(pos, entity);
         entity.position = pos;
      }
   }

   public void removeEntity(Entity entity)
   {
      this.removeEntityAt(entity.position);
   }

   private Optional<Entity> nearestEntity(List<Entity> entities,
                                                Point pos)
   {
      if (entities.isEmpty())
      {
         return Optional.empty();
      }
      else
      {
         Entity nearest = entities.get(0);
         int nearestDistance = nearest.position.distanceSquared(pos);

         for (Entity other : entities)
         {
            int otherDistance = other.position.distanceSquared(pos);

            if (otherDistance < nearestDistance)
            {
               nearest = other;
               nearestDistance = otherDistance;
            }
         }

         return Optional.of(nearest);
      }
   }

   public boolean processLine(String line, WorldModel world,
                              ImageStore imageStore)
   {
      String[] properties = line.split("\\s");
      if (properties.length > 0)
      {
         switch (properties[Functions.PROPERTY_KEY])
         {
            case Functions.BGND_KEY:
               return parseBackground(properties, imageStore);
            case Functions.OCTO_KEY:
               return parseOcto(properties, imageStore);
            case Functions.OBSTACLE_KEY:
               return parseObstacle(properties, imageStore);
            case Functions.FISH_KEY:
               return parseFish(properties, imageStore);
            case Functions.ATLANTIS_KEY:
               return parseAtlantis(properties, imageStore);
            case Functions.SGRASS_KEY:
               return parseSgrass(properties, imageStore);
            case Functions.HERO_KEY:
               return parseHero(properties, imageStore);
            case Functions.INJECTION_KEY:
               return parseInjection(properties, imageStore);
         }
      }

      return false;
   }

   private boolean parseBackground(String [] properties,
                                  ImageStore imageStore)
   {
      if (properties.length == Functions.BGND_NUM_PROPERTIES)
      {
         Point pt = new Point(Integer.parseInt(properties[Functions.BGND_COL]),
                 Integer.parseInt(properties[Functions.BGND_ROW]));
         String id = properties[Functions.BGND_ID];
         this.setBackground(pt,
                 new Background(id, imageStore.getImageList(id)));
      }

      return properties.length == Functions.BGND_NUM_PROPERTIES;
   }

   private boolean parseOcto(String [] properties,
                            ImageStore imageStore)
   {
      if (properties.length == Functions.OCTO_NUM_PROPERTIES)
      {
         Point pt = new Point(Integer.parseInt(properties[Functions.OCTO_COL]),
                 Integer.parseInt(properties[Functions.OCTO_ROW]));
         OctoNotFull entity = new OctoNotFull(properties[Functions.OCTO_ID],
                 Integer.parseInt(properties[Functions.OCTO_LIMIT]),
                 pt,
                 Integer.parseInt(properties[Functions.OCTO_ACTION_PERIOD]),
                 Integer.parseInt(properties[Functions.OCTO_ANIMATION_PERIOD]),
                 imageStore.getImageList(Functions.OCTO_KEY));
         this.tryAddEntity(entity);
      }

      return properties.length == Functions.OCTO_NUM_PROPERTIES;
   }

   private boolean parseObstacle(String [] properties,
                                ImageStore imageStore)
   {
      if (properties.length == Functions.OBSTACLE_NUM_PROPERTIES)
      {
         Point pt = new Point(
                 Integer.parseInt(properties[Functions.OBSTACLE_COL]),
                 Integer.parseInt(properties[Functions.OBSTACLE_ROW]));
         Obstacle entity = new Obstacle(properties[Functions.OBSTACLE_ID],
                 pt, imageStore.getImageList(Functions.OBSTACLE_KEY));
         this.tryAddEntity(entity);
      }

      return properties.length == Functions.OBSTACLE_NUM_PROPERTIES;
   }

   private boolean parseFish(String [] properties,
                            ImageStore imageStore)
   {
      if (properties.length == Functions.FISH_NUM_PROPERTIES)
      {
         Point pt = new Point(Integer.parseInt(properties[Functions.FISH_COL]),
                 Integer.parseInt(properties[Functions.FISH_ROW]));
         Fish entity = new Fish(properties[Functions.FISH_ID],
                 pt, Integer.parseInt(properties[Functions.FISH_ACTION_PERIOD]),
                 imageStore.getImageList(Functions.FISH_KEY));
         this.tryAddEntity(entity);
      }

      return properties.length == Functions.FISH_NUM_PROPERTIES;
   }

   private boolean parseHero(String [] properties,
                             ImageStore imageStore)
   {
      if (properties.length == Functions.HERO_NUM_PROPERTIES)
      {
         Point pt = new Point(Integer.parseInt(properties[Functions.HERO_COL]),
                 Integer.parseInt(properties[Functions.HERO_ROW]));
         Hero entity = new Hero(properties[Functions.HERO_ID],
                 pt, imageStore.getImageList(Functions.HERO_KEY), Integer.parseInt(properties[Functions.HERO_ACTION_PERIOD]), Integer.parseInt(properties[Functions.HERO_ANIMATION_PERIOD]));
         this.tryAddEntity(entity);
      }

      return properties.length == Functions.HERO_NUM_PROPERTIES;
   }

   private boolean parseInjection(String [] properties,
                             ImageStore imageStore)
   {
      if (properties.length == Functions.INJECTION_NUM_PROPERTIES)
      {
         Point pt = new Point(Integer.parseInt(properties[Functions.INJECTION_COL]),
                 Integer.parseInt(properties[Functions.INJECTION_ROW]));
         Injection injection = new Injection(pt, imageStore.getImageList(Functions.INJECTION_KEY));
         this.tryAddEntity(injection);
      }

      return properties.length == Functions.INJECTION_NUM_PROPERTIES;
   }

   private boolean parseAtlantis(String [] properties,
                                ImageStore imageStore)
   {
      if (properties.length == Functions.ATLANTIS_NUM_PROPERTIES)
      {
         Point pt = new Point(Integer.parseInt(properties[Functions.ATLANTIS_COL]),
                 Integer.parseInt(properties[Functions.ATLANTIS_ROW]));
         Atlantis entity = new Atlantis(properties[Functions.ATLANTIS_ID],
                 pt, imageStore.getImageList(Functions.ATLANTIS_KEY));
         this.tryAddEntity(entity);
      }

      return properties.length == Functions.ATLANTIS_NUM_PROPERTIES;
   }

   private boolean parseSgrass(String [] properties,
                              ImageStore imageStore)
   {
      if (properties.length == Functions.SGRASS_NUM_PROPERTIES)
      {
         Point pt = new Point(Integer.parseInt(properties[Functions.SGRASS_COL]),
                 Integer.parseInt(properties[Functions.SGRASS_ROW]));
         Sgrass entity = new Sgrass(properties[Functions.SGRASS_ID],
                 pt,
                 Integer.parseInt(properties[Functions.SGRASS_ACTION_PERIOD]),
                 imageStore.getImageList(Functions.SGRASS_KEY));
         this.tryAddEntity(entity);
      }

      return properties.length == Functions.SGRASS_NUM_PROPERTIES;
   }

   private void tryAddEntity(Entity entity)
   {
      if (isOccupied(entity.position))
      {
         // arguably the wrong type of exception, but we are not
         // defining our own exceptions yet
         throw new IllegalArgumentException("position occupied");
      }

      addEntity(entity);
   }

   /*private Entity createAtlantis(String id, Point position,
                                List<PImage> images)
   {
      return new Atlantis(id, position, images);
   }

   public static Entity createOctoFull(String id, int resourceLimit,
                                       Point position, int actionPeriod, int animationPeriod,
                                       List<PImage> images)
   {
      return new OctoFull(id, resourceLimit, position,
               actionPeriod, animationPeriod, images);
   }

   public static Entity createOctoNotFull(String id, int resourceLimit,
                                          Point position, int actionPeriod, int animationPeriod,
                                          List<PImage> images)
   {
      return new OctoNotFull(id, resourceLimit, position, actionPeriod, animationPeriod, images);
   }

   private Entity createObstacle(String id, Point position,
                                List<PImage> images)
   {
      return new Obstacle(id, position, images);
   }

   public static Entity createFish(String id, Point position, int actionPeriod,
                                   List<PImage> images)
   {
      return new Fish(id, position,
              actionPeriod, images);
   }

   public static Entity createCrab(String id, Point position,
                                   int actionPeriod, int animationPeriod, List<PImage> images)
   {
      return new Crab(id, position, actionPeriod, animationPeriod, images);
   }

   public static Entity createQuake(Point position, List<PImage> images)
   {
      return new Quake(position, images);
   }

   private Entity createSgrass(String id, Point position, int actionPeriod,
                              List<PImage> images)
   {
      return new Sgrass(id, position,
              actionPeriod, images);
   }*/
}
