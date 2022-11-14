import java.util.*;
import java.util.function.BiPredicate;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.Comparator;
import java.util.HashMap;

class AStarPathingStrategy
        implements PathingStrategy
{


    public List<Point> computePath(Point start, Point end,
                                   Predicate<Point> canPassThrough,
                                   BiPredicate<Point, Point> withinReach,
                                   Function<Point, Stream<Point>> potentialNeighbors)
    {
        List<Point> path = new ArrayList<>();
        Map<Point, Double> gVals = new HashMap<>();
        Map<Point, Double> fVals = new HashMap<>();
        Map<Point, Point> parents = new HashMap<>();
        Comparator<Point> comp = Comparator.comparing(fVals::get);
        Queue<Point> open = new PriorityQueue<>(comp);
        open.add(start);
        gVals.put(start, 0.0);
        fVals.put(start, getH(start, start, start));
        parents.put(start, start);
        Point node = start;
        while (!(open.isEmpty())/* && (!(node.equals(end)))*/) {
            if (withinReach.test(node, end)){
                return getPath(node, start, parents, path);
            }
            node = open.peek();
            open.remove(node);
            List<Point> points = potentialNeighbors.apply(node).filter(canPassThrough).collect(Collectors.toList());
            for (Point p : points) {
                double g = gVals.get(node) + 1.0;
                if (gVals.get(p) != null) {
                    if (gVals.get(p) > g) {
                        gVals.replace(p, g);
                        fVals.replace(p, g + getH(p, start, end));
                    }
                } else {
                    if (!(inOpen(p, open))) {
                        gVals.put(p, g);
                        fVals.put(p, g + getH(p, start, end));
                        parents.put(p, node);
                        open.add(p);
                    }
                }
            }
        }
        /*if (node.equals(end)) {
            node = parents.get(node);
            while (!(node.equals(start))) {
                path.add(0, node);
                node = parents.get(node);
            }
        }*/
        return path;
    }

    public List<Point> getPath(Point node, Point start, Map<Point, Point> parents, List<Point> path){
        while (!(node.equals(start))) {
            path.add(0, node);
            node = parents.get(node);
        }
        return path;
    }

    public Double getH(Point p, Point start, Point end){
        return Math.sqrt(Math.pow(end.x-p.x , 2) + Math.pow(end.y-p.y , 2));
    }

    public boolean inOpen(Point p1, Queue<Point> open){
        for (Point p2 : open){
            if (p1.equals(p2)) {return true;}
        }
        return false;
    }
}
