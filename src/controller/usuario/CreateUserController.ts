import { Request, Response } from "express";
import { CreateUserService } from "../../services/usuario/CreateUserService";

class CreateUserController{
    async handle(req: Request, res: Response){

        // Desconstrução do body da requisição
        const { email, senha, nome, papel } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            email,
            senha,
            nome,
            papel

        });

        return res.json(user)
    }
}

export {CreateUserController};