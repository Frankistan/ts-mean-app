import { Response, Request, NextFunction } from "express";

class IndexController {
	public index(req: Request, res: Response,next: NextFunction) {
		res.sendFile("C:/laragon/www/ts-mean-app/server/src/index.html");
	}
}

const indexController = new IndexController();
export default indexController;