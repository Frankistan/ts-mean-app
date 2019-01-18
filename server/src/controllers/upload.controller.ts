import { Response, Request, NextFunction } from "express";

class UploadController {
	public single(req: Request, res: Response,next: NextFunction) {

		var pagina =
			"<!doctype html><html><head></head><body>" +
			"<p>Se subió el archivo correctamente</p>" +
			'<br><a href="/">Retornar</a></body></html>';
		res.send(pagina);
	}

	public multiple(req: Request, res: Response) {}
}

const uploadController = new UploadController();
export default uploadController;
