import { Response, Request, NextFunction, ErrorRequestHandler } from "express";

export function ErrorMiddleware(
	err:ErrorRequestHandler,
	req:Request,
	res:Response,
	next: NextFunction
) {
	console.log('err: ',typeof err);
	console.log('next: ',typeof next);
	if (err.name === "UnauthorizedError") {
		// Send the error rather than to show it on the console
		res.status(401).send(err);
	} else {
		next(err);
	}
}
