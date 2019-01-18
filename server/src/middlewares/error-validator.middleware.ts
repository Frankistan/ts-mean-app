import expressValidation from "express-validation";
import { Response, Request, NextFunction } from "express";
import { ExtendableError } from "../helpers/utils";


export function ErrorValidatorMiddleware(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof expressValidation.ValidationError) {
		console.log('paso por aki',);
		// validation error contains errors which is an array of error each containing message[]
		const unifiedErrorMessage = err.errors.map((error:any) => {
			return error.messages.join('. ');
		}).join(' and ');
		const error = new ExtendableError(unifiedErrorMessage, err.status, true);
		return next(error);
	  }
}
