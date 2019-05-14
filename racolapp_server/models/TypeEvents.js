/* jshint indent: 2 */
import { Model, Sequelize } from "sequelize";

export default class TypeEvents extends Model {
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
				tableName: "TypeEvents",
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
