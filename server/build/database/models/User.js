"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
class User extends sequelize_1.Model {
}
User.init({
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "The username can not be null"
            },
            len: {
                args: [6, 16],
                msg: "The username has to be between 6 and 16 characters"
            },
            isUnique: (value, next) => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield User.findOne({
                    where: {
                        username: value
                    }
                });
                if (user != null) {
                    next(new sequelize_1.ValidationError("The username is already registered"));
                }
                else {
                    next();
                }
            })
        }
    },
    password: sequelize_1.DataTypes.STRING,
    fullname: sequelize_1.DataTypes.STRING
}, {
    sequelize: database_1.default,
    modelName: "users",
    tableName: "users",
    timestamps: false
});
exports.default = User;
