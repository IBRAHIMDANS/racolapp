import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import Users from "../models/Users";
const request = require("request");
import { now } from "moment";
import sgMail from "@sendgrid/mail";

const api = Router();

// api login
api.post("/login", (req, res) => {
	passport.authenticate("local", { session: false }, (err, user) => {
		if (err) {
			res.status(400).json({
				error: { message: err }
			});
		}

		const { pseudo, password } = user;
		const payload = { pseudo, password };
		const token = jwt.sign(payload, process.env.Token);

		res.status(200).json({ data: { user }, meta: { token } });
	})(req, res);
});

// Register users
api.post("/register", async (req, res) => {
	const createdAt = new now();
	const { pseudo, mail, password, password_confirm } = req.body;

	try {
		const user = new Users({
			pseudo,
			mail,
			password,
			password_confirm,
			active: 1,
			premium: 0,
			img_profil: null,
			created_at: createdAt
		});
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		await user.save();
		const msg = {
			to: `${mail}`,
			from: "app132132597@heroku.com",
			subject: "Inscription",
			text: `Bienvenue ${pseudo} dans la team Racolapp, votre inscription a bien été prise en compte.`,
			html:
				"<strong> Bienvenue dans la team Racolapp, votre inscription a bien été prise en compte. </strong>"
		};
		const data = {
			from: "steevefeno1@gmail.com", // don't change this address unless you authorize it on mailgun settings
			to: `steevefeno1@gmail.com`,
			subject: "Alert next Racoler on the App!",
			text: `Hey, ${pseudo} just joined the Racolapp team! Keep up the good work :D`
		};
		console.log(process.env.MAILGUN_API_KEY);
		await request
			.post(
				{
					url:
						"https://api.mailgun.net/v3/sandboxf3a77c67a06a4cb6aa24677eda52a6b3.mailgun.org/messages",
					form: data
				},
				(error, response, body) => {
					const result = {
						error: error,
						status: response && response.statusCode,
						body: body
					};
					res.send(result);
				}
			)
			.auth("api", `${process.env.MAILGUN_API_KEY}`);
		const payload = { pseudo, password };
		const token = jwt.sign(payload, process.env.Token);
		sgMail.send(msg);
		res.status(201).json({ data: { user }, meta: { token } });
	} catch (error) {
		console.log(error.message);
		res.json({ error: error.message }).status(400);
	}
});

export default api;
