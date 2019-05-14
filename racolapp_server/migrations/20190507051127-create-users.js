"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Users", {
			ID: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			pseudo: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true
			},
			mail: {
				type: Sequelize.STRING(255),
				allowNull: true,
				unique: true
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: true
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
		return queryInterface.dropTable("Users");
	}
};
