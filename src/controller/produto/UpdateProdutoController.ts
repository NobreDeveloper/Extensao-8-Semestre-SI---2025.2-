import { Request, Response } from "express";
import { UpdateProdutoService } from "../../services/produto/UpdateProdutoService";

class UpdateProdutoController{
    async handle(req: Request, res: Response){
        
        const {nome, descricao} = req.body;

        const produtoId = Number(req.params.produtoId)

        const produtorId = Number(req.params.produtorId)

        const file = (req as any).file as Express.Multer.File | undefined;

        const foto_produto = file?.filename;

        const updateProdutoService = new UpdateProdutoService();


        const produto = await updateProdutoService.execute({
            nome,
            descricao,
            foto_produto,
            produtoId,
            produtorId
        });

        return res.json(produto);
    }
}

export {UpdateProdutoController};
