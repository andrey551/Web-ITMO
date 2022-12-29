package Database;

import Model.Point;
import Model.RawPoint;
import jakarta.ejb.Local;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;

import java.util.List;

@Local
public interface PointTableRemote {
    public Point addPoint(RawPoint rawPoint, Long userId);
    List<Point> getListPointFromTable(Long userId);
    void deleteUserPoints(Long id);

    EntityManagerFactory getFactory();

    EntityManager getManager();

    void begin();

    void commit();
}
