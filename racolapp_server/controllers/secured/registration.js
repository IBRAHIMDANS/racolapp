import { Router } from "express";
import Registrations from "../../models/Registrations";
import jwt from "jsonwebtoken";
import verifyToken from "../verifyToken";
import { now } from "moment";
const api = Router();
api.get("/userID/:userID", verifyToken, async (req, res) => {
	await Registrations.findAll({ where: { UserID: req.params.userID } })
		.then(function(data) {
			console.log(req.body);
			res.json({ data }).status(200);
		})
		.catch(function(err) {
			res.status(500);
			res.json({ error: err.message });
		});
});
api.get("/", async (req, res) => {
	await Registrations.findAll()
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

api.post("/", verifyToken, async (req, res) => {
	//	const createdAt = new now();
	const register = new Registrations({
		registrated: 1,
		UserID: req.body.userID,
		EventID: req.body.eventID,
		created_at: ""
	});
	await register
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
	await Registrations.destroy({
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
	await Registrations.update(
		{
			registrated: req.body.registrated,
			Users_ID: req.body.Users_ID,
			Events_ID: req.body.Events_ID,
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
