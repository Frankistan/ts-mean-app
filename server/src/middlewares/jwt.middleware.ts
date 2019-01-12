import expressJwt from "express-jwt";

export const JWTMiddleware: expressJwt.RequestHandler = expressJwt({
	secret: `${process.env.JWT_SECRET}`
});