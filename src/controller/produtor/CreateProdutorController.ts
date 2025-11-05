import { Request, Response } from "express";
import { CreateProdutorService } from "../../services/produtor/CreateProdutorService";

class CreateProdutorController {
  async handle(req: Request, res: Response) {
    
    const { biografia, foto_perfil, contato_whatsapp, contato_email, userId } = req.body;

    const createProdutorService = new CreateProdutorService();

    const produtor = await createProdutorService.execute({
      biografia,
      foto_perfil,
      contato_whatsapp,
      contato_email,
      userId
    
    })

    return res.json(produtor)
  }
}

export { CreateProdutorController }
