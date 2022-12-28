package Model;

import Utils.jwtHandle;
import Utils.passwordHasher;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "client")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;

    @Column(name="token")
    private String token;

    public User(String username, String password) {
        this.username = username;
        this.password = passwordHasher.hashPassword( password);
        this.token = jwtHandle.createJWT(new RawUser(username, password));
    }

    public User() {
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}