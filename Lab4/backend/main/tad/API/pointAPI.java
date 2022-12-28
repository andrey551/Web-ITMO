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
        System.out.println(headerList);
        if(headerList.size() == 0) {
            return Response.status(401).build();
        }
        if(!userTableRemote.checkToken(headerList.get(0))) return Response.status(401).build();
        List<Point> list = pointTableRemote.getListPointFromTable();
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
        Point point= pointTableRemote.addPoint(raw);
        return Response.status(200).entity(JSONBuilder.pointParseWithoutId(point)).build();
    }

    @POST
    @Consumes("text/plain")
    @Path("/deletePoint")
    public Response deletePoint() {
        return Response.status(200).entity("Deleted Points").build();
    }

}
