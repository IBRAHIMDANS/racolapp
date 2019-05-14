/* jshint indent: 2 */
import Sequelize, { Model } from "sequelize";

export default class Registrations extends Model {
	static init(database) {
		return super.init(
			{
				registrated: {
					type: Sequelize.INTEGER(4),
					allowNull: false,
					primaryKey: true
				},
				UserID: {
					type: Sequelize.INTEGER(11),
					allowNull: false,
					primaryKey: true,
					references: {
						model: "Users",
						key: "ID"
					}
				},
				EventID: {
					type: Sequelize.INTEGER(11),
					allowNull: false,
					primaryKey: true,
					references: {
						model: "Events",
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
				tableName: "Registration",
				//underscored: true,
				sequelize: database,
				timestamps: false
			}
		);
	}
}
