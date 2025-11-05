import { Request, Response } from "express";
import { DeleteProdutorService } from "../../services/produtor/DeleteProdutorService";

class DeleteProdutorController{
    async handle(req: Request, res: Response){

        const producerId = Number(req.params.id);

        const deleteProdutorService = new DeleteProdutorService();

        const produtor = await deleteProdutorService.execute({
            producerId
        });

        return res.json(produtor)
    }
}

export {DeleteProdutorController};
