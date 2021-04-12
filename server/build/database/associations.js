"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../database/models/User"));
const Game_1 = __importDefault(require("../database/models/Game"));
User_1.default.hasMany(Game_1.default, { as: "games", foreignKey: "id_user" });
Game_1.default.belongsTo(User_1.default, { as: "user", foreignKey: "id_user" });
