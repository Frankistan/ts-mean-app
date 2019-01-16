import { Response, Request } from "express"; 

class UploadController {
	public single(req: Request, res: Response) {
		console.log("file: ", req.file);
		// if(err){
		// 	return res.send({"message": "File type is not supported!"});
		// }
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
