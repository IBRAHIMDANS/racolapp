"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Registrations", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			registrated: {
				type: Sequelize.INTEGER(4),
				allowNull: true
			},
			Users_ID: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				primaryKey: true,
				references: {
					model: "Users",
					key: "ID"
				}
			},
			Events_ID: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				primaryKey: true,
				references: {
					model: "Events",
					key: "ID"
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Registrations");
	}
};
