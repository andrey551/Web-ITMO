package com.example.demo2;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SessionScoped
@Named
public class helloBean implements Serializable {
    private static final float[] X_VALUES = {-3, -2, -1, 0, 1, 2, 3};
    private static final float Y_MIN = -3;
    private static final float Y_MAX = 5;
    private static final float[] R_VALUES = {1, 2, 3, 4, 5};
    private List<Point> storage = new ArrayList();
    private String x;
    private String y;
    private String r;

    private String message;

    public String getX() {
        return x;
    }

    public String getY() {
        return y;
    }

    public String getR() {
        return r;
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

    public void execute() {
        if(!validateX(x) || !validateY(y) || !validateR(r)){
            Point crt = new Point(getX(), getY(), getR());
            System.out.println(getX() + getY() + getR());
            storage.add(crt);
            DatabaseHandle dbHandle = new DatabaseHandle();
            String message = dbHandle.insertPoint(crt);
            System.out.println(message);
        }
    }

    public boolean validateX(String xstr) {
        float x = Float.parseFloat(xstr);
        if(Float.isFinite(x)||
            Float.isNaN(x)||
            !Arrays.asList(X_VALUES).contains(x)) return false;
        return true;
    }

    public boolean validateY(String ystr) {
        float y = Float.parseFloat(ystr);
        if(Float.isFinite(y)||
                Float.isNaN(y)||
                y > Y_MAX||
                y < Y_MIN) {

            return false;
        }
        return true;
    }

    public boolean validateR(String rstr) {
        float r = Float.parseFloat(rstr);
        if(Float.isFinite(r)||
                Float.isNaN(r)||
                !Arrays.asList(R_VALUES).contains(r)) return false;
        return true;
    }

    public List<Point> getStorage() {
        return this.storage;
    }
}
