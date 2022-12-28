package Utils;

import Model.Point;
import Model.RawPoint;
import Model.RawUser;
import Model.User;
import jakarta.json.*;
import jakarta.json.stream.JsonParsingException;


import java.io.StringReader;
import java.util.List;

public class JSONBuilder {

    public static RawUser rawUserBuilder(String jsonStr) {
        JsonReader reader = Json.createReader(new StringReader(jsonStr));
        JsonObject object = reader.readObject();

        RawUser rawUser = new RawUser(object.getString("username"), object.getString("password"));

        return rawUser;
    }

    public static RawPoint rawPointBuilder(String jsonStr) {
        JsonReader reader = Json.createReader(new StringReader(jsonStr));
        JsonObject object = reader.readObject();
        RawPoint rawPoint = new RawPoint(object.getString("x"), object.getString("y"), object.getString("r") );
        return rawPoint;
    }

    public static String wrapTokenByJson(String token) {
        JsonObject value = Json.createObjectBuilder()
                .add("token", token)
                .build();

        return value.toString();
    }

    public static String userToJson(User user) {
        JsonObject value = Json.createObjectBuilder()
                .add("username", user.getUsername())
                .add("password", user.getPassword())
                .add("token", user.getToken())
                .build();
        return value.toString();
    }

    public static String listPointsToJSON(List<Point> list) {
        String res = "[";
        int id = 0;
        for(Point point : list) {
            res += pointParseWithId(point, ++id);
            res += ",";
        }
        if(res.endsWith(","))  res = res.substring(0,res.length() - 1);

        res += "]";
        return res;
    }

    public static String tokenParser(String payload) {
        JsonObject object = null;
        try {
            JsonReader reader = Json.createReader(new StringReader(payload));
            object = reader.readObject();
        } catch(JsonParsingException e) {
            return "Unauthorized";
        }
        return object.getString("iss");
    }

    public static String pointParseWithoutId(Point point) {
        JsonObject value = Json.createObjectBuilder()
                .add("x", point.getX())
                .add("y", point.getY())
                .add("r", point.getR())
                .add("result", point.getResult())
                .build();
        return value.toString();
    }
    public static String pointParseWithId(Point point, int id) {
        JsonObject value = Json.createObjectBuilder()
                .add("id", id)
                .add("x", point.getX())
                .add("y", point.getY())
                .add("r", point.getR())
                .add("result", point.getResult())
                .build();
        return value.toString();
    }

    public static RawUser rawUserParser(String userJson) {
        JsonReader reader = Json.createReader(new StringReader(userJson));
        JsonObject object = reader.readObject();
        RawUser rawUser = new RawUser(object.getString("username"), object.getString("password"));
        return rawUser;
    }

}
