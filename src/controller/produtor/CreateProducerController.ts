import { Request, Response } from "express";
import { CreateProducerService } from "../../services/produtor/CreateProducerService";

class CreateProducerController{
    async handle(req: Request, res: Response){
        const {nome, biografia, foto_perfil, contato_whatsapp, contato_email, userId} = req.body;

        const createProducerService = new CreateProducerService();

        


    };
}

export { CreateProducerController }

// nome, biografia, fotoPerfil, contatoWpp, contatoEmail, userId