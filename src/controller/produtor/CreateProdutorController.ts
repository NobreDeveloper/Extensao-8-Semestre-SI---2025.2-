import { Request, Response } from "express";
import { CreateProdutorService } from "../../services/produtor/CreateProdutorService";

class CreateProdutorController {
  async handle(req: Request, res: Response) {
    try {
      // Desconstrução do body da requisição
      const {
        nome,
        biografia,
        foto_perfil,
        contato_whatsapp,
        contato_email,
      } = req.body;

      // Obter o userId do token JWT (adicionado pelo middleware isAuthenticated)
      const userId = parseInt(req.user_id);

      const createProdutorService = new CreateProdutorService();

      const produtor = await createProdutorService.execute({
        nome,
        biografia,
        foto_perfil,
        contato_whatsapp,
        contato_email,
        userId,
      });

      return res.json(produtor);
    } catch (err: any) {
      console.error("Erro ao criar produtor:", err); // <-- log completo
      return res.status(400).json({ error: err.message });
    }
  }
}

export { CreateProdutorController }
