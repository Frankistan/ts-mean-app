import { Response, Request, NextFunction, Errback } from "express";

export function ErrorMiddleware(
	err:any,
	req:any,
	res:any,
	next:any
) {
	if (err.name === "UnauthorizedError") {
		// Send the error rather than to show it on the console
		res.status(401).send(err);
	} else {
		next(err);
	}
}
