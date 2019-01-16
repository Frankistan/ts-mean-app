import { Router } from "express";
import MulterMiddleware from "../middlewares/multer.middleware";
import uploadController from "../controllers/upload.controller";

class UploadRoutes {
	public router: Router = Router();

	constructor() {
		this.config();
	}

	config(): void {
		this.router.post(
			"/single",
			MulterMiddleware.single("avatar"),
			uploadController.single
		);
		this.router.post(
			"/multiple",
			MulterMiddleware.array("photos", 12),
			uploadController.multiple
		);
		// this.router.get("/images", uploadController.collection);
		// this.router.get("/images/:id", uploadController.image);
	}
}

const uploadRoutes = new UploadRoutes();
export default uploadRoutes.router;
