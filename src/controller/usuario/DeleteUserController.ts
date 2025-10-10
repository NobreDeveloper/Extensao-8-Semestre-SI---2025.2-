import { Request, Response } from "express";
import { DeleteUserService } from "../../services/usuario/DeleteUserService";


class DeleteUserController{
    async handle(req: Request, res: Response){
        
        const userId = Number(req.params.id);

        const deleteUserService = new DeleteUserService();

        const user = await deleteUserService.execute({
            userId
        });

        return res.json(user)

    }
}

export { DeleteUserController }