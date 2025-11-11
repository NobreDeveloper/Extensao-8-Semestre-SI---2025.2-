import { Request, Response } from "express";
import { ListProdutorService } from "../../services/produtor/ListProdutorService";

class ListProdutorController {
  async handle(req: Request, res: Response) {
    const listProdutorService = new ListProdutorService();
    const produtores = await listProdutorService.execute();

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const produtor = produtores.map((produtor) => ({
      ...produtor,
      foto_perfil_url: produtor.foto_perfil
        ? `${baseUrl}/files/${produtor.foto_perfil}`
        : null,
    }));

    return res.json(produtor);
  }
}

export { ListProdutorController };