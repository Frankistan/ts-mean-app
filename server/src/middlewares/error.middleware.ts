import { Response, Request, NextFunction } from "express";

export function ErrorMiddleware(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err.message === "unsupported_file")
		res.status(401).send({ message: "File type is not supported!", err });
	if (err.name === "UnauthorizedError") res.status(401).send(err);

	next(err);
}
