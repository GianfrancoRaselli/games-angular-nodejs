import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import sequelize from "./database/database";

import authenticationRoutes from "./routes/authenticationRoutes";
import gamesRoutes from "./routes/gamesRoutes";

class Server {

    private app: Application;

    constructor() {
        this.app = express();
        dotenv.config();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(): void {
        this.app.set("port", process.env.PORT || 4000);
    }

    middlewares(): void {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use("/api/auth", authenticationRoutes);
        this.app.use("/api/games", gamesRoutes);
    }

    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port ", this.app.get("port"));

            // connect to database
            sequelize.authenticate().then(() => {
                console.log("DB is connected");
            }).catch(() => {
                console.log("DB is not connected");
            });
        });
    }

}

const server = new Server();
server.start();