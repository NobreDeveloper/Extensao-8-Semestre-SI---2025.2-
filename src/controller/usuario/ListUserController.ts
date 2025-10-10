import { Request, Response } from "express";
import { ListUserService } from "../../services/usuario/ListUserService";


class ListUserController{
    async handle(req:Request, res: Response){

        const listUserService = new ListUserService();

        const usuarios = await listUserService.execute();

        return res.json(usuarios);
    };
}

export { ListUserController }