import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { cleanFolder } from "./helpers/utils";

// MIDDLEWARES
import { ErrorValidatorMiddleware } from "./middlewares/error-validator.middleware";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import { JWTMiddleware } from "./middlewares/jwt.middleware";

// ROUTES
import indexRoutes from "./routes/index.routes";
import gamesRoutes from "./routes/games.routes";
import authRoutes from "./routes/auth.routes";
import uploadRoutes from "./routes/upload.routes";

dotenv.config();

cleanFolder();

class Server {
	public app: Application;

	PORT = process.env.PORT || 3000;

	constructor() {
		this.app = express();
		this.config();
		this.preMiddlewares();
		this.routes();
		this.postMiddlewares();
	}

	config(): void {
		this.app.set("port", this.PORT);
	}

	preMiddlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(morgan("dev"));
		this.app.use(
			cors({
				origin: "*",
				optionsSuccessStatus: 200
			})
		);
		this.app.use(
			JWTMiddleware.unless({
				path: [
					"/",
					"/auth/login",
					"/auth/signup",
					"/upload/single",
					"upload/multiple"
				]
			})
		);
	}

	routes(): void {
		this.app.use("/", indexRoutes);
		this.app.use("/auth", authRoutes);
		this.app.use("/api/games", gamesRoutes);
		this.app.use("/upload", uploadRoutes);
	}

	postMiddlewares() {
		this.app.use(ErrorValidatorMiddleware);
		this.app.use(ErrorMiddleware);
	}

	start(): void {
		this.app.listen(this.app.get("port"), () => {
			console.log(`Server on port: ${this.PORT}`);
		});
	}
}

const server = new Server();
server.start();
