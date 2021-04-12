"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database/database"));
const authenticationRoutes_1 = __importDefault(require("./routes/authenticationRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        dotenv_1.default.config();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set("port", process.env.PORT || 4000);
    }
    middlewares() {
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(helmet_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/api/auth", authenticationRoutes_1.default);
        this.app.use("/api/games", gamesRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port ", this.app.get("port"));
            // connect to database
            database_1.default.authenticate().then(() => {
                console.log("DB is connected");
            }).catch(() => {
                console.log("DB is not connected");
            });
        });
    }
}
const server = new Server();
server.start();
