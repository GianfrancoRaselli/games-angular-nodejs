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
exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../database/models/User"));
const tokenValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.headers.authorization) {
        return res.status(401).json("Access denied");
    }
    else {
        const token = req.headers.authorization.split(" ")[1];
        if (token === null) {
            return res.status(401).json("Access denied");
        }
        else {
            try {
                const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "tokentest");
                const user = yield User_1.default.findByPk(payload.id);
                if (user === null) {
                    return res.status(401).json("Access denied");
                }
                else {
                    req.userId = ((_a = user.id_user) === null || _a === void 0 ? void 0 : _a.toString()) || "";
                    next();
                }
            }
            catch (e) {
                return res.status(401).json("Access denied");
            }
        }
    }
});
exports.tokenValidation = tokenValidation;
