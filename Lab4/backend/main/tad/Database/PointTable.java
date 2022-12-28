package Database;

import Model.Point;
import Model.RawPoint;
import jakarta.ejb.Stateful;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.util.List;

@Stateful
public class PointTable implements PointTableRemote{

    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("tad");
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    @Override
    public Point addPoint(RawPoint rawPoint) {
        begin();
        Point point = new Point(rawPoint.getX(), rawPoint.getY(), rawPoint.getR());
        entityManager.createNativeQuery("INSERT INTO point (X, Y, R, RESULT) VALUES ( ?, ? , ?, ?)")
                .setParameter(1, point.getX())
                .setParameter(2, point.getY())
                .setParameter(3, point.getR())
                .setParameter(4, point.getResult())
                .executeUpdate();
        commit();
        return point;
    }


    @Override
    public List<Point> getListPointFromTable() {
        begin();
        List<Point> res = (List<Point>) entityManager.createQuery("Select a from Point a").getResultList();
        commit();

        return res;
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
