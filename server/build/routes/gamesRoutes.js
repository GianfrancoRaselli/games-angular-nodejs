"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesController_1 = __importDefault(require("../controllers/gamesController"));
const validateToken_1 = require("../middlewares/validateToken");
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", validateToken_1.tokenValidation, gamesController_1.default.list);
        this.router.get("/:id", validateToken_1.tokenValidation, gamesController_1.default.getOne);
        this.router.post("/", validateToken_1.tokenValidation, gamesController_1.default.create);
        this.router.put("/:id", validateToken_1.tokenValidation, gamesController_1.default.update);
        this.router.delete("/:id", validateToken_1.tokenValidation, gamesController_1.default.delete);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
