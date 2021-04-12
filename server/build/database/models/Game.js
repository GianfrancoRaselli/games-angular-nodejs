"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
class Game extends sequelize_1.Model {
}
Game.init({
    id_game: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: sequelize_1.DataTypes.STRING,
    description: sequelize_1.DataTypes.STRING,
    image: sequelize_1.DataTypes.STRING,
    created_at: sequelize_1.DataTypes.DATE
}, {
    sequelize: database_1.default,
    modelName: "games",
    tableName: "games",
    timestamps: false
});
exports.default = Game;
