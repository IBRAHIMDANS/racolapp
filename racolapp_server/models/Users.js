/* jshint indent: 2 */
import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt";

export default class Users extends Model {
	static init(database) {
		return super.init(
			{
				ID: {
					type: Sequelize.INTEGER(11),
					allowNull: false,
					primaryKey: true,
					autoIncrement: true
				},
				pseudo: {
					type: Sequelize.STRING(255),
					unique: {
						args: true,
						msg: "pseudo already in use"
					}
				},
				mail: {
					type: Sequelize.STRING(255),
					allowNull: true,
					unique: true,
					validate: {
						isEmail: { msg: "Email is not valid." }
					}
				},
				password_digest: {
					type: Sequelize.STRING(255),
					allowNull: false,
					validate: {
						notEmpty: true
					}
				},
				password: {
					type: Sequelize.VIRTUAL,
					validate: {
						isLongEnough(v) {
							if (v.length < 4) {
								throw new Error("Password must have at least 4 characters");
							}
						}
					}
				},
				password_confirm: {
					type: Sequelize.VIRTUAL,
					validate: {
						isEqual(v) {
							if (v !== this.password) {
								throw new Error("Password confirmation doesn't match password");
							}
						}
					}
				},
				active: {
					type: Sequelize.INTEGER(4),
					allowNull: true
				},
				premium: {
					type: Sequelize.INTEGER(4),
					allowNull: true
				},
				img_profil: {
					type: Sequelize.STRING(45),
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
				tableName: "Users",
				sequelize: database,
				timestamps: false,
				indexes: [
					{
						unique: true,
						fields: ["ID","mail","pseudo"]
					}
				],
				hooks: {
					async beforeValidate(user) {
						if (user.isNewRecord) {
							user.password_digest = await user.generateHash();
						}
					},
					async beforeSave(user) {
						if (!user.isNewRecord && user.changed("password")) {
							user.password_digest = await user.generateHash();
						}
					},
					async beforeUpdate(user) {
						if (user.password && user.changed("password")) {
							user.password_digest = await user.generateHash();
						}
					}
				},
			}
		);
	}
	async generateHash() {
		const SALT_ROUND = 5;
		const hash = await bcrypt.hash(this.password, SALT_ROUND)
		
		// if (!hash) {
		// 	throw new Error("Can't hash password");
		// }
		return hash;
	}

	async checkPassword(password) {
		return await bcrypt.compare(password, this.password_digest);
	}

	toJSON() {
		const values = Object.assign({}, this.get());

		delete values.password_digest;
		delete values.password;
		delete values.password_confirm;
		return values;
	}
}
