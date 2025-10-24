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

            // Validação do produtorId se fornecido
            if(produtorId && isNaN(Number(produtorId))){
                return res.status(400).json({ error: "ID do produtor inválido" });
            }

            // Obter o ID do usuário autenticado
            const userId = req.user_id;
            if(!userId){
                return res.status(401).json({ error: "Usuário não autenticado" });
            }

            const updateProdutoService = new UpdateProdutoService();

            // Preparar dados para envio
            const updateData: any = {
                id: produtoId,
                userId: parseInt(userId)
            };

            // Adicionar apenas os campos fornecidos
            if (nome !== undefined) updateData.nome = nome;
            if (descricao !== undefined) updateData.descricao = descricao;
            if (foto_produto !== undefined) updateData.foto_produto = foto_produto;
            if (produtorId !== undefined) updateData.produtorId = Number(produtorId);

            const produto = await updateProdutoService.execute(updateData);

            return res.json(produto);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export {UpdateProdutoController};
