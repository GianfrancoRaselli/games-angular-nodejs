import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../database/models/User";

interface IPayload {
    id: string;
    iat: number;
}

export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json("Access denied");
    } else {
        const token = req.headers.authorization.split(" ")[1];
        if (token === null) {
            return res.status(401).json("Access denied");
        } else {
            try {
                const payload = jwt.verify(token, process.env.TOKEN_SECRET || "tokentest") as IPayload;
                const user = await User.findByPk(payload.id);
                if (user === null) {
                    return res.status(401).json("Access denied");
                } else {
                    req.userId = user.id_user?.toString() || "";
                    next();
                }
            } catch (e) {
                return res.status(401).json("Access denied");
            }
        }
    }
}