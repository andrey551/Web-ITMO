package Model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "point")
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name="x")
    private String x;
    @Column(name="y")
    private String y;
    @Column(name="r")
    private String r;
    @Column(name="result")
    private String result;

    @Column(name="owner_id")
    private Long owner_id;

    public Point( String x, String y, String r, Long userId) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = checkHit();
        this.owner_id = userId;
    }

    public Point() {
    }

    public String checkHit() {
        Float xFloat = Float.parseFloat(x);
        Float yFloat = Float.parseFloat(y);
        Float rFloat = Float.parseFloat(r);

        if(!validatePoint(xFloat, yFloat , rFloat)) {
            return "Validate fail";
        }
        if(xFloat >= 0 && yFloat >= 0) {
            if(xFloat <= rFloat / 2 && yFloat <= rFloat) {
                return "Hit";
            }
        }

        if(xFloat >= 0 && yFloat <= 0) {
            if(xFloat * xFloat + yFloat * yFloat <= rFloat * rFloat) {
                return "Hit";
            }
        }

        if(xFloat <= 0 && yFloat >= 0) {
            if(yFloat-xFloat <= rFloat / 2) {
                return "Hit";
            }
        }

        return "Miss";
    }

    public boolean validatePoint(Float x, Float y, Float r) {
        if(x.isInfinite()
                || x.isNaN()
                || y.isInfinite()
                || y.isNaN()
                || r.isInfinite()
                || r.isNaN()) {
            return false;
        }

        List<Float> X_VALUES = Arrays.asList(-3.0F, -2.0F, -1F, 0F, 1F, 2F, 3F, 4F, 5F);
        Float Y_MAX = 5F;
        Float Y_MIN = -5F;
        List<Float> R_VALUES = Arrays.asList( 1F, 2F, 3F, 4F, 5F);

        if(!X_VALUES.contains(x) ||
                y > Y_MAX ||  y < Y_MIN ||
                !R_VALUES.contains(r)) return false;

        return true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setX(String x) {
        this.x = x;
    }

    public void setY(String y) {
        this.y = y;
    }

    public void setR(String r) {
        this.r = r;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Long getOwner_id() {
        return owner_id;
    }

    public void setOwner_id(Long owner_id) {
        this.owner_id = owner_id;
    }

    public String getX() {
        return x;
    }

    public String getY() {
        return y;
    }

    public String getR() {
        return r;
    }

    public String getResult() {
        return result;
    }

    @Override
    public String toString() {
        return "Point{" +
                "id=" + id +
                ", x='" + x + '\'' +
                ", y='" + y + '\'' +
                ", r='" + r + '\'' +
                ", result='" + result + '\'' +
                '}';
    }
}
