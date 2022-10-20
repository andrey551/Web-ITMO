package com.example.demo2;

import java.io.Serializable;

public class Point implements Serializable {
    private String x;
    private String y;
    private String r;
    private String result;

    private float xNum;
    private float yNum;
    private float rNum;

    public Point(String x, String y, String r) {
        this.x = x;
        this.y = y;
        this.r = r;
        execute();
    }

    public void execute() {
        setNumberValue();
        if(checkQuadrant()|| checkTriangle() || checkSquare())
            result = "Hit";
        else
            result = "Miss";
    }

    public String getX() {
        return this.x;
    }

    public String getR() {
        return r;
    }

    public String getY() {
        return y;
    }

    public String getResult() {
        return result;
    }

    private boolean checkQuadrant() {
        if(xNum >= 0 && yNum <= 0) {
            if(xNum * xNum + yNum * yNum <= rNum * rNum / 4) {
                return true;
            }
        }
        return false;
    }

    private boolean checkTriangle() {
        if( xNum <= 0 && yNum <= 0) {
            if( xNum + 2 *yNum >= -rNum ) {
                return true;
            }
        }

        return false;
    }

    private boolean checkSquare() {
        if(xNum <= 0 && yNum >= 0) {
            if( xNum >= -rNum && yNum <= rNum) {
                return true;
            }
        }

        return false;
    }

    private void setNumberValue() {
        this.xNum = Float.parseFloat(this.x);
        this.yNum = Float.parseFloat(this.y);
        this.rNum = Float.parseFloat(this.r);
    }
}
