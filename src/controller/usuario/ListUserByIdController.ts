import { Request, Response } from "express";
import { ListUserByIdService } from "../../services/usuario/ListUserByIdService";

class ListUserByIdController{
    async handle(req: Request, res: Response){
        
        const userId = Number(req.params.id)

        const listUserByIdService = new ListUserByIdService();

        const user = await listUserByIdService.execute({userId})

        return res.json(user)
    }
}

export { ListUserByIdController }