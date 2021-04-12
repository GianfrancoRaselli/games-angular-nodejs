import { Request, Response } from "express";
import Game from "../database/models/Game";

class GamesController {
    
    public async list(req: Request, res: Response) {
        const games = await Game.findAll({
            where: {
                id_user: req.userId
            },
            attributes: ["id_game", "title", "description", "image", "created_at", "id_user"]
        });
        res.json(games);
    }

    public async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const game = await Game.findOne({
            where: {
                id_game: id,
                id_user: req.userId
            },
            attributes: ["id_link", "title", "url", "description", "created_at", "id_user"]
        });
        if (game != null) {
            res.json(game);
        } else {
            res.status(404).json({ text: "The game doesn't exists" });
        };
    }

    public async create(req: Request, res: Response) {
        const { title, description, image } = req.body;
        await Game.create({ 
            title,
            description,
            image,
            id_user: req.userId
        });
        res.json({ message: "The game was saved" });
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description, image } = req.body;
        await Game.update({
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
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await Game.destroy({
            where: {
                id_game: id,
                id_user: req.userId
            }
        });
        res.json({ message: "The game was deleted" });
    }

}

const gamesController = new GamesController();
export default gamesController;