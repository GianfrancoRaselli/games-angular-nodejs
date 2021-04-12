"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("./keys"));
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(keys_1.default.database, keys_1.default.user, keys_1.default.password, {
    host: keys_1.default.host,
    port: keys_1.default.port,
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});
exports.default = sequelize;
