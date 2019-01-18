import del from "del";
import dotenv from "dotenv";

dotenv.config();

// const imageFilter = function(req: Request, file: any, cb: any) {
// 	// accept image only
// 	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
// 		return cb(new Error("Only image files are allowed!"), false);
// 	}
// 	cb(null, true);
// };

class ExtendableError extends Error {
	status: any;
	isPublic: any;
	isOperational: boolean;
	constructor(message: string , status: any, isPublic: any) {
		super(message);
		this.name = this.constructor.name;
		this.message = message;
		this.status = status;
		this.isPublic = isPublic;
		this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
		Error.captureStackTrace(this, this.constructor);
	}
}

const cleanFolder = function(
	folderPath: string = "" + process.env.UPLOAD_PATH
) {
	// delete files inside folder but not the folder itself
	del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

export { ExtendableError, cleanFolder }


