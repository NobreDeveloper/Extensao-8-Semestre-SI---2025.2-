import { Request, Response } from "express";
import { ListProdutorByIdService } from "../../services/produtor/ListProdutorByIdService";


class ListProdutorByIdController{
    async handle(req: Request, res: Response){
        
        const produtorId = Number(req.params.id)

        const listProdutorByIdService = new ListProdutorByIdService();

        const produtor = await listProdutorByIdService.execute({produtorId})

        return res.json(produtor)
    }
}

export { ListProdutorByIdController }