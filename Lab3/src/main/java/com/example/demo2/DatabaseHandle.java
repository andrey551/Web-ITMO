package com.example.demo2;

import org.postgresql.util.PSQLException;

import java.sql.*;

public class DatabaseHandle {
    public static final String USER_TABLE = "STORAGE";
    public String insertQuery = "INSERT INTO " + USER_TABLE + "(x, y, r, result) VALUES (?, ?, ?, ?)";


    private final String JDBC_DRIVER = "org.postgresql.Driver";

    private final String dbURL = "jdbc:postgresql://pg:5432/studs";
    private final String dbUsername = "s336186";
    private final String dbPassword = "6yIMLAKp5Qq7MPqa";
    private Connection connection;

    public DatabaseHandle() {
        connectToDatabase();
    }
    public void connectToDatabase() {
        try{
            Class.forName(JDBC_DRIVER);
            connection = DriverManager.getConnection(dbURL, dbUsername, dbPassword);
        } catch(SQLException e) {
            System.out.println(e.getMessage());
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public String insertPoint(Point point) {
        try {
            if(connection == null) return "Connection is not set";
            connection.setAutoCommit(false);
            PreparedStatement stmt = connection.prepareStatement(insertQuery);
            stmt.setString(1, point.getX());
            stmt.setString(2, point.getY());
            stmt.setString(3, point.getR());
            stmt.setString(4, point.getResult());
            System.out.println(stmt);
            stmt.executeUpdate();
            connection.commit();
            stmt.close();
            return "Point has inserted successfully!";
        } catch (java.sql.SQLException | NullPointerException e) {
            e.printStackTrace();
        }
        return "Cannot execute request!";
    }
}
