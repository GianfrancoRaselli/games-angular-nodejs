import User from "../database/models/User";
import Game from "../database/models/Game";

User.hasMany(Game, { as: "games", foreignKey: "id_user" });
Game.belongsTo(User, { as: "user", foreignKey: "id_user" });