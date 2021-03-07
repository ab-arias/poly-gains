import java.util.*;
import java.util.function.BiPredicate;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.Comparator;
import java.util.Queue;

public class newPathing implements PathingStrategy{

    public List<Point> computePath(Point start, Point end,
                                   Predicate<Point> canPassThrough,
                                   BiPredicate<Point, Point> withinReach,
                                   Function<Point, Stream<Point>> potentialNeighbors)
    {
        List<Point> path = new ArrayList<>();
        List<Point> closed = new ArrayList<>();
        List<Point> open = new LinkedList<>();
        Map<Point, Point> parents = new HashMap<>();
        open.add(start);
        Point pos = open.get(0);
        while ((!(open.isEmpty())) && (!(withinReach.test(pos, end)))){
            pos = open.get(0);
            open.remove(0);
            List<Point> points = potentialNeighbors.apply(pos).filter(canPassThrough).collect(Collectors.toList());
            for (Point p : points){
                if ((!(isIn(p, closed))) && (!(isIn(p, open)))){
                    parents.put(p, pos);
                    open.add(p);
                }
            }
            closed.add(pos);
        }
        if (open.isEmpty()) { return path;}
        while (pos != start){
            path.add(0, pos);
            pos = parents.get(pos);
        }
        return path;
    }

    private boolean isIn(Point point, List<Point> closed){
        for (Point p : closed){
            if ((p.x == point.x) && (p.y == point.y)){
                return true;
            }
        }
        return false;
    }

    /*private boolean DFS(Point pos, Queue<Point> open, List<Point> path)
    {
        Point next =
        boolean direction = DFS(next(pos), path);
        if (direction) {
            path.add(0, pos);
            addToOpen(open)
            return true;
        }
        return false;
    }*/
}
