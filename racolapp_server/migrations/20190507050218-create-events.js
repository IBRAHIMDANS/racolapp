"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Events", {
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
			Users_ID: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				references: {
					model: "Users",
					key: "ID"
				}
			},
			TypeEvents_ID: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				references: {
					model: "TypeEvents",
					key: "ID"
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Events");
	}
};
