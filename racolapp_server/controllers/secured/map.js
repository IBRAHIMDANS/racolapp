import { Router } from "express";
import TypeEvents from "../../models/TypeEvents";
import jwt from "jsonwebtoken";

const api = Router();

api.get("/", async (req, res) => {
	await TypeEvents.findAll()
		.then(data => {
			res.status(200);
			res.json({
				route: data
			});
		})
		.catch(err => {
			res.status(500);
			res.json({
				error: err.message
			});
		});
});

export default api;
