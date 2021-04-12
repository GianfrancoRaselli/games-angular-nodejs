import database from "./keys";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(database.database, database.user, database.password, {
    host: database.host,
    port: database.port,
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

export default sequelize;