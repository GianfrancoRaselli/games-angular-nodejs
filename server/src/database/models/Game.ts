import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Game extends Model {
    public id_game?: number;
    public title?: string;
    public description?: string;
    public image?: string;
    public created_at?: Date;
}
Game.init({
    id_game: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    created_at: DataTypes.DATE
}, {
    sequelize,
    modelName: "games",
    tableName: "games",
    timestamps: false
});

export default Game;