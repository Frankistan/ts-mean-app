import multer from "multer";
import dotenv from "dotenv";
import fsx from "fs-extra-promise";

dotenv.config();

const Storage = multer.diskStorage({
	destination: function(
		req: Express.Request,
		file: Express.Multer.File,
		callback
	) {
		let path = "" + process.env.UPLOAD_PATH;
		async (path: string) => {
			try {
				await fsx.ensureDir(path);
				console.log("success!");
			} catch (err) {
				console.error(err);
			}
		};
		callback(null, path);
	},
	filename: function(
		req: Express.Request,
		file: Express.Multer.File,
		callback
	) {
		callback(null, Date.now() + "-" + file.originalname);
	}
});

var MulterMiddleware = multer({
	storage: Storage,
	fileFilter: (req: Express.Request, file: Express.Multer.File, callback) => {
		if(!file.mimetype.match(/jpeg|jpg|png|gif$i/)){
			callback(new Error("File type is not supported!"),false);
		}

		callback(null,true);
	}
});
export default MulterMiddleware;
