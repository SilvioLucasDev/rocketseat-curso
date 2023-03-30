import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppErros";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const id = request.user;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findByEmail(id);

    if (!user.isAdmin) {
        throw new AppError("User isn't admin", 401);
    }

    return next();
}
