import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ValidationError } from "sequelize";

import encryptPassword from "../lib/encryptPassword";

import User from "../database/models/User";

class AuthenticationController {
    
    public async signup(req: Request, res: Response) {
        const { username, password, fullname } = req.body;
        if (!(username && password && fullname)) {
            return res.status(400).json({ message: "Username and Password are required" });
        } else {
            try {
                const encryptedPassword = await encryptPassword.encryptPassword(password);
                const savedUser = await User.create({
                    username,
                    password: encryptedPassword,
                    fullname,
                });
                const token: string = jwt.sign({ id: savedUser.id_user }, process.env.TOKEN_SECRET || "tokentest");
                return res.status(200).json({ token });
            } catch (e) {
                if (e instanceof ValidationError) {
                    return res.status(400).json({ message: e.message });
                } else {
                    return res.status(400).json({ error: e });
                }
            }
        }
    }

    public async signin(req: Request, res: Response) {
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).json({ errorMessage: "Username or password is wrong" });
        } else {
            try {
                const user = await User.findOne({
                    where: {
                        username
                    }
                });
                if (user === null) {
                    return res.status(400).json({ errorMessage: "Username or password is wrong" })
                } else {
                    const validPassword = await encryptPassword.matchPassword(password, user.password || "");
                    if (!validPassword) {
                        return res.status(400).json({ errorMessage: "Username or password is wrong" });
                    } else {
                        const token: string = jwt.sign({ id: user.id_user }, process.env.TOKEN_SECRET || "tokentest");
                        return res.status(200).json({ token });
                    }
                }
            } catch (e) {
                return res.status(400).json({ errorMessage: e });
            }
        }
    }

    public async profile(req: Request, res: Response) {
        const user = await User.findByPk(req.userId);
        if (user === null) {
            return res.status(404).json("No user found");
        } else {
            return res.json(user);   
        }
    }
}

const authenticationController = new AuthenticationController();
export default authenticationController;