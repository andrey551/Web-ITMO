package API;

import Utils.JSONBuilder;
import Database.UserTableRemote;
import Model.RawUser;
import Model.User;
import Utils.passwordHasher;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/user")
public class userAPI {
    @EJB
    private UserTableRemote userTableRemote;


    @POST
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Path("/register")
    public Response addUser(String userJson) {
        RawUser rawUser = JSONBuilder.rawUserParser(userJson);
        User user = userTableRemote.addUser(rawUser);
        if(user == null) {
            return Response.status(400).entity("Cannot create user!").build();
        }
        user.setPassword(rawUser.getPassword());
        return Response.status(200).entity(JSONBuilder.userToJson(user)).build();
    }

    @POST
    @Consumes("text/plain")
    @Path("/checkToken")
    public Response verify(String jwtString) {
        userTableRemote.checkToken(jwtString);
        if(userTableRemote.checkToken(jwtString) == -1)
            return Response.status(400).entity("Session timeout!").build();
        return Response.status(200).entity(JSONBuilder.wrapTokenByJson(jwtString)).build();
    }

    @POST
    @Path("/login")
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response auth(String UserJson) {
        RawUser rawUser = JSONBuilder.rawUserBuilder(UserJson);
        System.out.println(passwordHasher.hashPassword(rawUser.getPassword()));
        User user  = userTableRemote.checkUser(rawUser);
        if(user == null) {
            return Response.status(400).entity("Username or password is incorrect!").build();
        }
        user.setPassword(rawUser.getPassword());
        String res= JSONBuilder.userToJson(user);

        return Response.status(200)
                .entity(res).build();
    }


}
