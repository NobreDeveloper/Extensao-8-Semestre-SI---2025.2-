import { Request, Response } from "express";
import { ListProdutorService } from "../../services/produtor/ListProdutorService";

class ListProdutorController{
    async handle(req: Request, res: Response){

        const listProdutorService = new ListProdutorService();

        const produtor = await listProdutorService.execute();

        return res.json(produtor)
    }
}

export {ListProdutorController};
