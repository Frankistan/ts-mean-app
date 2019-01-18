import { Router } from "express";
import validate from 'express-validation';
import authController from "../controllers/auth.controller";
import { rules } from "../params.validation";

class AuthRoutes {
	public router: Router = Router();

	constructor() {
		this.config();
	}

	config(): void {
		this.router.post("/login",validate(rules) ,authController.login);
		this.router.post("/signup", authController.signup);
	}
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
