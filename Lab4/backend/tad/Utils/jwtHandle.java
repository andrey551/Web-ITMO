package Utils;

import Model.RawUser;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import java.util.Base64;
import java.util.Date;
import java.util.UUID;

public class jwtHandle
{
    private static final String key = "TuanAnhdeptraiprovipno1";
    private static Algorithm algorithm = Algorithm.HMAC256(key);


    public static String createJWT(RawUser user) {
        return JWT.create()
                .withIssuer(key)
                .withSubject("Authorized account")
                .withClaim(user.getUsername(), user.getPassword())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 5000L))
                .withJWTId(UUID.randomUUID().toString())
                .withNotBefore(new Date(System.currentTimeMillis() + 1000L))
                .sign(algorithm);
    }
    public static String verify(String jwtToken) {
        try{
            String[] chunks = jwtToken.split("\\.");
            Base64.Decoder decoder = Base64.getUrlDecoder();
            String payload = new String(decoder.decode(chunks[1]));
            if(JSONBuilder.tokenParser(payload).equals(key)) return "Authorized";
            return JSONBuilder.tokenParser(payload);
        } catch (JWTVerificationException e) {
            System.out.println(e.getMessage());
        }

        return "Unauthorized";
    }

}