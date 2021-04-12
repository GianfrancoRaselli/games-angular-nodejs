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
const Game_1 = __importDefault(require("../database/models/Game"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield Game_1.default.findAll({
                where: {
                    id_user: req.userId
                },
                attributes: ["id_game", "title", "description", "image", "created_at", "id_user"]
            });
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield Game_1.default.findOne({
                where: {
                    id_game: id,
                    id_user: req.userId
                },
                attributes: ["id_link", "title", "url", "description", "created_at", "id_user"]
            });
            if (game != null) {
                res.json(game);
            }
            else {
                res.status(404).json({ text: "The game doesn't exists" });
            }
            ;
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, image } = req.body;
            yield Game_1.default.create({
                title,
                description,
                image,
                id_user: req.userId
            });
            res.json({ message: "The game was saved" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, description, image } = req.body;
            yield Game_1.default.update({
                title,
                description,
                image
            }, {
                where: {
                    id_game: id,
                    id_user: req.userId
                }
            });
            res.json({ message: "The game was updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield Game_1.default.destroy({
                where: {
                    id_game: id,
                    id_user: req.userId
                }
            });
            res.json({ message: "The game was deleted" });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
