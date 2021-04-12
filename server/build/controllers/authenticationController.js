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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const encryptPassword_1 = __importDefault(require("../lib/encryptPassword"));
const User_1 = __importDefault(require("../database/models/User"));
class AuthenticationController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, fullname } = req.body;
            if (!(username && password && fullname)) {
                return res.status(400).json({ message: "Username and Password are required" });
            }
            else {
                try {
                    const encryptedPassword = yield encryptPassword_1.default.encryptPassword(password);
                    const savedUser = yield User_1.default.create({
                        username,
                        password: encryptedPassword,
                        fullname,
                    });
                    const token = jsonwebtoken_1.default.sign({ id: savedUser.id_user }, process.env.TOKEN_SECRET || "tokentest");
                    return res.status(200).json({ token });
                }
                catch (e) {
                    if (e instanceof sequelize_1.ValidationError) {
                        return res.status(400).json({ message: e.message });
                    }
                    else {
                        return res.status(400).json({ error: e });
                    }
                }
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!(username && password)) {
                return res.status(400).json({ errorMessage: "Username or password is wrong" });
            }
            else {
                try {
                    const user = yield User_1.default.findOne({
                        where: {
                            username
                        }
                    });
                    if (user === null) {
                        return res.status(400).json({ errorMessage: "Username or password is wrong" });
                    }
                    else {
                        const validPassword = yield encryptPassword_1.default.matchPassword(password, user.password || "");
                        if (!validPassword) {
                            return res.status(400).json({ errorMessage: "Username or password is wrong" });
                        }
                        else {
                            const token = jsonwebtoken_1.default.sign({ id: user.id_user }, process.env.TOKEN_SECRET || "tokentest");
                            return res.status(200).json({ token });
                        }
                    }
                }
                catch (e) {
                    return res.status(400).json({ errorMessage: e });
                }
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByPk(req.userId);
            if (user === null) {
                return res.status(404).json("No user found");
            }
            else {
                return res.json(user);
            }
        });
    }
}
const authenticationController = new AuthenticationController();
exports.default = authenticationController;
