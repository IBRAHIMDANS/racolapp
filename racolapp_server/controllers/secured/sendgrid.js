// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import { Router } from "express";
const request = require("request");
const api = Router();

api.post("/register", async (req, res) => {
	const data = {
		from: "steevefeno1@gmail.com", // don't change this address unless you authorize it on mailgun settings
		to: `steevefeno1@gmail.com`,
		subject: "Alert next Racoler on the App!",
		text: `Hey, ${
			req.body.mail
		} just joined the Racolapp team! Keep up the good work :D`
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
});

// api.post("/registered", async (req, res) => {
// 	const msg = {
// 		to: `ibrahima.dansoko@outlook.com`,
// 		from: "ibrahima.dansoko@outlook.com",
// 		subject: "Inscription",
// 		text:
// 			"Bienvenue dans la team Racolapp, votre inscription a bien été prise en compte.",
// 		html:
// 			"<strong> Bienvenue dans la team Racolapp, votre inscription a bien été prise en compte. </strong>"
// 	};
// 	await mail
// 		.send(msg)
// 		.then(data => {
// 			console.log(data);
// 			return data;
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			return err.message;
// 		});
// 	res.json({ text: msg.text }).status(200);
// });

export default api;
