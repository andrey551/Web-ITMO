package Database;

import Model.RawUser;
import Model.User;
import jakarta.ejb.Local;
import jakarta.persistence.EntityManager;

@Local
public interface UserTableRemote {
    User checkUser(RawUser rawUser);
    User addUser(RawUser rawUser);
    boolean checkToken(String token);
    EntityManager getManager();

    void begin();

    void commit();
}
