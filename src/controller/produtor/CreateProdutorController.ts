import { Request, Response } from "express";
import { CreateProdutorService } from "../../services/produtor/CreateProdutorService";
import { Multer } from "multer";

class CreateProdutorController {
  async handle(req: Request, res: Response) {
    
    const { biografia, contato_whatsapp, contato_email } = req.body;

    const userId = Number(req.body.userId);

    const createProdutorService = new CreateProdutorService();
    
    if(!req.file){
      throw new Error("Falha no upload da imagem")

    } else {

      const file = req.file as Express.Multer.File;

      const {originalname, filename: foto_perfil} = file;
      
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
}

export { CreateProdutorController }
