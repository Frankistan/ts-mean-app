import { Response, Request } from "express";

class IndexController {
	public index(req: Request, res: Response) {
		res.send("Hello, this is the index route from controller");
	}
}

const indexController = new IndexController();
export default indexController;