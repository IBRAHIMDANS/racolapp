import { Router } from "express";
import passport from "passport";
import auth from "./auth";
import secured from "./secured";
import Events from "../models/Events";

const api = Router();

api.get("/", (req, res) => {
	res.send({
		name: "racolapp",
		status: "running"
	});
});
// get events
api.get("/events", async (req, res) => {
	const data = await Events.findAll();
	res
		.json({
			data
		})
		.status(200);
});

// get event by id
api.get("/events/:id", async (req, res) => {
	const data = await Events.findByPk(req.params.id)
		.then(data => {
			res.status(200);
			res.json({
				data
			});
		})
		.catch(err => {
			res.status(500);
			res.json({
				err: err.message
			});
		});
});

api.use("/", secured);
api.use("/auth", auth);

export default api;
