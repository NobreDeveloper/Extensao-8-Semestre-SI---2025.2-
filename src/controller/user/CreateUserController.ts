import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{
    async handle(req: Request, res: Response){

        // Desconstrução do body da requisição
        const { email, senha, nome } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            email,
            senha,
            nome

        });

        return res.json(user)
    }
}

export {CreateUserController};