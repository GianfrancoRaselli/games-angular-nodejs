import { Router } from "express";

import authenticationController from "../controllers/authenticationController";
import { tokenValidation } from "../middlewares/validateToken";

class AuthenticationRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post("/signup", authenticationController.signup);
        this.router.post("/signin", authenticationController.signin);
        this.router.get("/profile", tokenValidation, authenticationController.profile);
    }

}

const authenticationRoutes = new AuthenticationRoutes();
export default authenticationRoutes.router;