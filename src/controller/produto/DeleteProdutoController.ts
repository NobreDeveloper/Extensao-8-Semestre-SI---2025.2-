import { Request, Response } from "express";
import { DeleteProdutoService } from "../../services/produto/DeleteProdutoService";

class DeleteProdutoController{
    async handle(req: Request, res: Response){

        const produtoId = Number(req.params.produtoId);

        const produtorId = Number(req.params.produtorId)

        const deleteProdutoService = new DeleteProdutoService();

        const produto = await deleteProdutoService.execute({
            produtoId,
            produtorId
        })

        return res.json(produto)
    }
}

export {DeleteProdutoController};
