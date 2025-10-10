import { Request, Response } from "express";
import { UpdateProdutoService } from "../../services/produto/UpdateProdutoService";

class UpdateProdutoController{
    async handle(req: Request, res: Response){
        try {
            // Desconstrução do body da requisição
            const { nome, descricao, foto_produto, produtorId } = req.body;
            const { id } = req.params;

            // Validação se o ID foi fornecido
            if(!id){
                return res.status(400).json({ error: "ID é obrigatório" });
            }

            // Validação se o ID é um número válido
            const produtoId = parseInt(id);
            if(isNaN(produtoId)){
                return res.status(400).json({ error: "ID deve ser um número válido" });
            }

            // Obter o ID do usuário autenticado
            const userId = req.user_id;
            if(!userId){
                return res.status(401).json({ error: "Usuário não autenticado" });
            }

            const updateProdutoService = new UpdateProdutoService();

            const produto = await updateProdutoService.execute({
                id: produtoId,
                nome,
                descricao,
                foto_produto,
                produtorId,
                userId: parseInt(userId) // Passar o ID do usuário para validação de propriedade
            });

            return res.json(produto);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export {UpdateProdutoController};
