package Database;


import Model.RawUser;
import Model.User;
import Utils.passwordHasher;
import jakarta.ejb.Stateful;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import java.util.List;

@Stateful
public class UserTable implements UserTableRemote{
    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("tad");
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    List<User> userList = null;

    @Override
    public User checkUser(RawUser rawUser) {
        setUserList();
        String hashedPass = passwordHasher.hashPassword(rawUser.getPassword());
        for(User user : userList) {
            if(user.getUsername().equals(rawUser.getUsername())
            && user.getPassword().equals(hashedPass)) {
                return user;
            }
        }
        return null;
    }

    @Override
    public User addUser(RawUser rawUser) {
        begin();
        setUserList();
        for(User user : userList) {
            if(user.getUsername().equals( rawUser.getUsername())) return null;
        }
        User user = new User(rawUser.getUsername(), rawUser.getPassword());

        entityManager.createNativeQuery("INSERT INTO client (USERNAME, PASSWORD, TOKEN) VALUES ( ?, ?, ?)")
                .setParameter(1, user.getUsername())
                .setParameter(2, user.getPassword())
                .setParameter(3, user.getToken())
                .executeUpdate();
        commit();
        return user;
    }

    @Override
    public boolean checkToken(String token) {
        setUserList();
        for(User user : userList) {
            if(user.getToken().equals(token))
                return true;
        }
        return false;
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

    public void setUserList() {
        if(userList == null) {
            begin();
            userList = (List<User>) entityManager.createQuery("Select a from User a").getResultList();
            commit();
        }
    }
}
