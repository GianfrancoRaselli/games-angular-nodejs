import { Model, DataTypes, Optional, IntegerDataType, ValidationError } from "sequelize";
import sequelize from "../database";

class User extends Model {
    public id_user?: number;
    public  username?: string;
    public password?: string;
    public fullname?: string;
}
User.init({
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "The username can not be null"
            },
            len: {
                args: [6, 16],
                msg: "The username has to be between 6 and 16 characters"
            },
            isUnique: async (value: string, next: Function) => {
                const user = await User.findOne({
                    where: {
                        username: value
                    }
                });
                if (user != null) {
                    next(new ValidationError("The username is already registered"));
                } else {
                    next();
                }
            }
        }
    },
    password: DataTypes.STRING,
    fullname: DataTypes.STRING
}, {
    sequelize,
    modelName: "users",
    tableName: "users",
    timestamps: false
});

export default User;