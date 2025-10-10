import { Request, Response } from "express";
import { DeleteProdutorService } from "../../services/produtor/DeleteProdutorService";

class DeleteProdutorController{
    async handle(req: Request, res: Response){

        const { id } = req.params;

        // Validação se o ID foi fornecido
        if(!id){
            return res.status(400).json({ error: "ID é obrigatório" });
        }

        const deleteProdutorService = new DeleteProdutorService();

        const result = await deleteProdutorService.execute({
            id: parseInt(id)
        });

        return res.json(result)
    }
}

export {DeleteProdutorController};
