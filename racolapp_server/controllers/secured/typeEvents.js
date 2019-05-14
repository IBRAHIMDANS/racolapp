import { Router } from "express";
import TypeEvents from "../../models/TypeEvents";
import { now } from "moment";
import jwt from "jsonwebtoken";
import verifyToken from "../verifyToken";
const api = Router();

api.get("/", async (req, res) => {
	await TypeEvents.findAll()
		.then(data => {
			console.log(data);
			res.json({
				data
			});
		})
		.catch(err => {
			res.status(500);
			res.json({
				error: err.message
			});
		});
});

api.post("/", verifyToken, async (req, res) => {
	const createdAt = new now();
	const typeevents = new TypeEvents({
		name: req.body.name,
		EventID: req.body.eventID,
		created_at: createdAt
	});
	await typeevents
		.save()
		.then(function(data) {
			res.status(200);
			res.json(data.get({ plain: true }));
		})
		.catch(function(err) {
			res.status(500);
			res.json({
				error: err.message
			});
		});
});

api.delete("/:id", verifyToken, async (req, res) => {
	await TypeEvents.destroy({
		where: { ID: req.params.id }
	})
		.then(data => {
			res.status(200);
			res.json(data.get({ plain: true }));
		})
		.catch(err => {
			res.status(500);
			res.json({ error: err.message });
		});
});

api.put("/:id", verifyToken, async (req, res) => {
	await TypeEvents.update(
		{
			name: req.body.name,
			created_at: createdAt
		},
		{ where: { ID: req.body.id }, returning: true, plain: true }
	)
		.then(function(data) {
			res.status(200);
			res.json(data.get({ plain: true }));
		})
		.catch(function(error) {
			res.status(500);
			res.json({ error: error.message });
		});
});

export default api;
