export default class Core {
	constructor({ host, port, username, database, password }) {
		this.host = host;
		this.port = port;
		this.username = username;
		this.database = database;
		this.password = password;
	}
}
