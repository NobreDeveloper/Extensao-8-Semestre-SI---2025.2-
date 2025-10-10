import { Request, Response } from "express";
import { UpdateUserService } from "../../services/usuario/UpdateUserService";

class UpdateUserController{
    async handle(req: Request, res: Response){

        const usuarioId = Number(req.params.id)

        const { email, senha, nome, papel } = req.body;

        const updateUserService = new UpdateUserService();

        const user = await updateUserService.execute({
            usuarioId,
            email,
            senha,
            nome,
            papel
        })

        return res.json(user)

    }
}

export { UpdateUserController }