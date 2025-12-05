import { Request, Response } from "express";
import { ListProdutoByIdService } from "../../services/produto/ListProdutoByIdService";


class ListProdutoByIdController{
    async handle(req: Request, res: Response){
        
        const produtoId = Number(req.params.produtoId)

        const produtorId = Number(req.params.produtorId)

        const listProdutoByIdService = new ListProdutoByIdService();

        const produto = await listProdutoByIdService.execute({produtoId, produtorId})

        return res.json(produto)
    }
}

export { ListProdutoByIdController }