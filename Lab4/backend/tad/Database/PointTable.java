package Database;

import Model.Point;
import Model.RawPoint;
import jakarta.ejb.Stateful;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.util.List;
// wasn't use correct case of EJB. should be Singleton,when we have only 1 container
@Stateful
public class PointTable implements PointTableRemote{

    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("tad");
    EntityManager entityManager = entityManagerFactory.createEntityManager();

    @Override
    public Point addPoint(RawPoint rawPoint, Long userId) {
        begin();
        Point point = new Point(rawPoint.getX(), rawPoint.getY(), rawPoint.getR(), userId);
        if(!point.getResult().equals("Hit") && !point.getResult().equals("Miss") ) return null;
        entityManager.createNativeQuery("INSERT INTO point (X, Y, R, RESULT, OWNER_ID) VALUES ( ?, ? , ?, ?, ?)")
                .setParameter(1, point.getX())
                .setParameter(2, point.getY())
                .setParameter(3, point.getR())
                .setParameter(4, point.getResult())
                .setParameter(5, point.getOwner_id())
                .executeUpdate();
        commit();
        return point;
    }


    @Override
    public List<Point> getListPointFromTable(Long userId) {
        begin();
        List<Point> res = (List<Point>) entityManager.createQuery("Select a from Point a WHERE a.owner_id = ?1")
                .setParameter(1, userId).getResultList();

        commit();

        return res;
    }

    @Override
    public void deleteUserPoints(Long id) {
        begin();
        entityManager.createQuery("Delete from Point a WHERE a.owner_id = ?1")
                .setParameter(1, id).executeUpdate();

        commit();
    }


    @Override
    public EntityManagerFactory getFactory() {
        return this.entityManagerFactory;
    }

    @Override
    public EntityManager getManager() {
        return this.entityManager;
    }

    @Override
    public void begin() {
        entityManager.getTransaction().begin();
    }

    @Override
    public void commit() {
        entityManager.getTransaction().commit();
    }
}
