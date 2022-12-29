package API;

import Database.UserTableRemote;
import Utils.JSONBuilder;
import Database.PointTableRemote;
import Model.Point;
import Model.RawPoint;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/point")
public class pointAPI {
    @EJB
    private PointTableRemote pointTableRemote;
    @EJB
    private UserTableRemote userTableRemote;

    @POST
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Path("/getList")
    public Response getList(@Context HttpHeaders httpHeaders) {
        List<String> headerList = httpHeaders.getRequestHeader("Authorization");
        if(headerList.size() == 0) {
            return Response.status(401).build();
        }
        Long user_id = userTableRemote.checkToken(headerList.get(0));
        if(user_id == -1) return Response.status(401).build();
        List<Point> list = pointTableRemote.getListPointFromTable(user_id);
        String res = JSONBuilder.listPointsToJSON(list);
        return Response.status(200).entity(res).build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Path("/addPoint")
    public Response addPoint(@Context HttpHeaders httpHeaders,RawPoint raw) {
        List<String> headerList = httpHeaders.getRequestHeader("Authorization");
        if(headerList.size() == 0) {
            return Response.status(401).build();
        }
        Long user_id = userTableRemote.checkToken(headerList.get(0));
        if(user_id == -1) return Response.status(401).build();
        Point point= pointTableRemote.addPoint(raw, user_id);
        if(point == null) return Response.status(400).entity("Invalidate parameter!").build();
        return Response.status(200).entity(JSONBuilder.pointParseWithoutId(point)).build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Path("/deletePoint")
    public Response deletePoint(@Context HttpHeaders httpHeaders) {
        List<String> headerList = httpHeaders.getRequestHeader("Authorization");
        if(headerList.size() == 0) {
            return Response.status(401).build();
        }
        Long user_id = userTableRemote.checkToken(headerList.get(0));
        if(user_id == -1) return Response.status(401).build();
        pointTableRemote.deleteUserPoints(user_id);
        return Response.status(200).entity("Deleted Points").build();
    }

}
