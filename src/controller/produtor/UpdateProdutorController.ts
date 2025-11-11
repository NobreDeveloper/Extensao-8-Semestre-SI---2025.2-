import { Request, Response } from "express";
import { UpdateProdutorService } from "../../services/produtor/UpdateProdutorService";

class UpdateProdutorController{
    async handle(req: Request, res: Response){
        
        const { biografia, contato_email, contato_whatsapp} = req.body;

        const produtorId = Number(req.params.id);

        const file = (req as any).file as Express.Multer.File | undefined;

        const foto_perfil = file?.filename;

        const updateProdutorService = new UpdateProdutorService();

        const produtor = await updateProdutorService.execute({
            biografia,
            foto_perfil,
            contato_email,
            contato_whatsapp,
            produtorId
        })
    
        return res.json(produtor)
    }
}

export {UpdateProdutorController};
