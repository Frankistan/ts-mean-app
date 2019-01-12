import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import { ErrorMiddleware } from "./middlewares/error.middleware";
import { JtMiddleWare } from "./middlewares/jwt.middleware";

import indexRoutes from "./routes/index.routes";
import gamesRoutes from "./routes/games.routes";
import authRoutes from "./routes/auth.routes";

class Server {
	public app: Application;

	PORT = process.env.PORT || 3000;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
	}

	config(): void {
		this.app.set("port", this.PORT);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(morgan("dev"));
		this.app.use(cors());
	}

	routes(): void {
		this.app.use("/", indexRoutes);
		this.app.use("/auth", authRoutes);
		this.app.use("/api/games", JtMiddleWare, gamesRoutes);
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
