import expressJwt from "express-jwt";

export const JtMiddleWare: expressJwt.RequestHandler = expressJwt({
	secret: `${process.env.JWT_SECRET}`
});