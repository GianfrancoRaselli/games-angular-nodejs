import { Router } from "express";

import gamesController from "../controllers/gamesController";
import { tokenValidation } from "../middlewares/validateToken";

class GamesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", tokenValidation, gamesController.list);
        this.router.get("/:id", tokenValidation, gamesController.getOne);
        this.router.post("/", tokenValidation, gamesController.create);
        this.router.put("/:id", tokenValidation, gamesController.update);
        this.router.delete("/:id", tokenValidation, gamesController.delete);
    }

}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;