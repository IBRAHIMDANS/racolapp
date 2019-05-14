import Sequelize from "sequelize";

import Users from "./Users";
import Events from "./Events";
import Registrations from "./Registrations";
import TypeEvents from "./TypeEvents";

var env = process.env.DB_ENV || "development";
var config = require("../config/config")[env];
export const db = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
		port: config.port,
		dialect: config.dialect,
		login: console.log,
		dialectOptions: {
			ssl: config.ssl
		},
		define: {
			timestramps: false
		}
	}
);
db.authenticate()
	.then(() => {
		console.log("success");
	})
	.catch(err => {
		console.log("error");
	});

Users.init(db);

Events.init(db);
TypeEvents.init(db);
Registrations.init(db);

// Users.belongsTo(Events);
Events.belongsTo(Users);
Users.belongsToMany(Events, { through: Registrations });
// Events.belongsToMany(Users, { through: Registrations });
// Events.belongsTo(TypeEvents);
TypeEvents.belongsTo(Events);
