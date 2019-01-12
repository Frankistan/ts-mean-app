import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../database";

class AuthController {
	public async login(req: Request, res: Response): Promise<void | any> {
		const { email, password } = req.body;

		const result = await pool.query("SELECT * FROM users WHERE email = ?", [
			email
		]);

		if (result.length == 0) {
			return res.status(404).json({ text: "The user doesn't exits" });
		}

		let user = result[0];

		bcrypt
			.compare(password, user.password)
			.then((match: any) => {
				if (match) {
					const payload = { user: user.id };
					const options = { expiresIn: "1h" };
					const secret = process.env.JWT_SECRET;

					jwt.sign(payload, secret, options, (err: any, token: any) => {
						return res
							.header({ Authorization: "Bearer " + token })
							.status(200)
							.json({
								status: 401,
								error: null,
								token
							});
					});
				} else {
					result.error = "Authentication error";
					return res.status(401).send({
						status: 401,
						error: "Authentication error"
					});
				}
			})
			.catch((error: any) => {
				return res.status(500).send({
					status: 500,
					error
				});
			});
	}

	public signup(req: Request, res: Response) {
		bcrypt.hash(req.body.password, 10, async (err: any, hash: any) => {
			if (err) {
				return res.status(500).json({
					error: err
				});
			} else {
				const newUser = {
					name: req.body.name,
					email: req.body.email,
					password: hash
				};
				const result = await pool.query("INSERT INTO users set ?", [newUser]);

				if (!result)
					return res.status(500).json({
						message: "Error on saving new user"
					});

				return res.status(200).json({
					success: "New user has been created"
				});
			}
		});
	}
}

const authController = new AuthController();
export default authController;
