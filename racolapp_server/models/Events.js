import { Model, Sequelize } from "sequelize";

export default class Events extends Model {
	static init(database) {
		return super.init(
			{
				ID: {
					type: Sequelize.INTEGER(11),
					allowNull: false,
					primaryKey: true,
					autoIncrement: true
				},
				name: {
					type: Sequelize.STRING(255),
					allowNull: true
				},
				long: {
					type: Sequelize.STRING(255),
					allowNull: true
				},
				lat: {
					type: Sequelize.STRING(255),
					allowNull: true
				},
				capacity: {
					type: Sequelize.INTEGER(11),
					allowNull: true
				},
				date: {
					type: Sequelize.DATE,
					allowNull: true
				},
				description: {
					type: Sequelize.STRING(255),
					allowNull: true
				},
				duration: {
					type: Sequelize.STRING(255),
					allowNull: true
				},
				counterViews: {
					type: Sequelize.INTEGER(11),
					allowNull: true
				},
				UserID: {
					type: Sequelize.INTEGER(11),
					allowNull: false,
					references: {
						model: "Users",
						key: "ID"
					}
				},
				TypeEventsID: {
					type: Sequelize.INTEGER(11),
					allowNull: false,
					references: {
						model: "TypeEvents",
						key: "ID"
					}
				},
				created_at: {
					type: Sequelize.DATE,
					allowNull: true
				},
				updated_at: {
					type: Sequelize.DATE,
					allowNull: true
				}
			},
			{
				tableName: "Events",
				// underscored: true,
				sequelize: database,
				timestamps: false,
				indexes: [
					{
						unique: true,
						fields: ["ID"]
					}
				]
			}
		);
	}
}
