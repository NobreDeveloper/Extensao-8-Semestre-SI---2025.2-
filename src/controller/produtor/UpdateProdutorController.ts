import { Request, Response } from "express";
import { UpdateProdutorService } from "../../services/produtor/UpdateProdutorService";

class UpdateProdutorController{
    async handle(req: Request, res: Response){
        
        const {nome, biografia, foto_perfil, contato_email, contato_whatsapp} = req.body;

        const producerId = Number(req.params.id);

        const updateProdutorService = new UpdateProdutorService();

        const produtor = await updateProdutorService.execute({
            nome,
            biografia,
            foto_perfil,
            contato_email,
            contato_whatsapp,
            producerId
        })
    
        return res.json(produtor)
    }
}

export {UpdateProdutorController};
