import { Request, Response } from "express";
import { DeleteProdutoService } from "../../services/produto/DeleteProdutoService";

class DeleteProdutoController{
    async handle(req: Request, res: Response){

        const { id } = req.params;

        // Validação se o ID foi fornecido
        if(!id){
            return res.status(400).json({ error: "ID é obrigatório" });
        }

        const deleteProdutoService = new DeleteProdutoService();

        const result = await deleteProdutoService.execute({
            id: parseInt(id)
        });

        return res.json(result)
    }
}

export {DeleteProdutoController};
