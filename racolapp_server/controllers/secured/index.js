import { Router } from "express";
import users from "./users";
import map from "./map";
import events from "./events";
import TypeEvents from "./typeEvents";
import Registrations from "./registration";
import sendgrid from "./sendgrid";
import passport from "passport";


const api = Router();

api.use("/users", passport.authenticate("jwt", { session: false }), users);

api.use("/events", passport.authenticate("jwt", { session: false }), events);

api.use("/typeEvents", TypeEvents);

api.use("/map", passport.authenticate("jwt", { session: false }), map);

api.use("/registrations", passport.authenticate("jwt", { session: false }), Registrations);

api.use("/send",sendgrid);

export default api;
