"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticationController_1 = __importDefault(require("../controllers/authenticationController"));
const validateToken_1 = require("../middlewares/validateToken");
class AuthenticationRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post("/signup", authenticationController_1.default.signup);
        this.router.post("/signin", authenticationController_1.default.signin);
        this.router.get("/profile", validateToken_1.tokenValidation, authenticationController_1.default.profile);
    }
}
const authenticationRoutes = new AuthenticationRoutes();
exports.default = authenticationRoutes.router;
