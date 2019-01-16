import del from "del";
import { Request } from "express";
import dotenv from "dotenv";
import Loki from 'lokijs';
import { Collection } from 'lokijs';

dotenv.config();

const imageFilter = function(req: Request, file: any, cb: any) {
	// accept image only
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return cb(new Error("Only image files are allowed!"), false);
	}
	cb(null, true);
};

const loadCollection = function (colName:any, db: Loki): Promise<Collection<any>> {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colName) || db.addCollection(colName);
            resolve(_collection);
        })
    });
}

const cleanFolder = function(
	folderPath: string = "" + process.env.UPLOAD_PATH
) {
	// delete files inside folder but not the folder itself
	del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

export { imageFilter, loadCollection, cleanFolder }
// export { imageFilter, cleanFolder };
