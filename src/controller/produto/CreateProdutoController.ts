import { Request, Response } from "express";
import { CreateProdutoService } from "../../services/produto/CreateProdutoService";

class CreateProdutoController {
  async handle(req: Request, res: Response) {
    try {
      const { nome, descricao, foto_produto, produtorId } = req.body;

      // Validação do produtorId
      if (!produtorId || isNaN(Number(produtorId))) {
        return res.status(400).json({ error: "ID do produtor inválido" });
      }

      const createProdutoService = new CreateProdutoService();

      const produto = await createProdutoService.execute({
        nome,
        descricao,
        foto_produto,
        produtorId: Number(produtorId),
      });

      return res.status(201).json(produto);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateProdutoController };