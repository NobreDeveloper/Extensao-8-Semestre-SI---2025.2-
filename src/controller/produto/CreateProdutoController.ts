import { Request, Response } from "express";
import { CreateProdutoService } from "../../services/produto/CreateProdutoService";

class CreateProdutoController{
    async handle(req: Request, res: Response){

        // Desconstrução do body da requisição
        const { nome, descricao, foto_produto, produtorId } = req.body;

        const createProdutoService = new CreateProdutoService();

        const produto = await createProdutoService.execute({
            nome,
            descricao,
            foto_produto,
            produtorId
        });

        return res.json(produto)
    }
}

export {CreateProdutoController};
