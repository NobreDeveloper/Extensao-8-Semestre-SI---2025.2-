import { Request, Response } from "express";
import { UpdateProdutorService } from "../../services/produtor/UpdateProdutorService";

class UpdateProdutorController{
    async handle(req: Request, res: Response){
        try {
            // Desconstrução do body da requisição
            const { nome, biografia, foto_perfil, contato_whatsapp, contato_email } = req.body;
            const { id } = req.params;

            // Validação se o ID foi fornecido
            if(!id){
                return res.status(400).json({ error: "ID é obrigatório" });
            }

            // Validação se o ID é um número válido
            const produtorId = parseInt(id);
            if(isNaN(produtorId)){
                return res.status(400).json({ error: "ID deve ser um número válido" });
            }

            // Obter o ID do usuário autenticado
            const userId = req.user_id;
            if(!userId){
                return res.status(401).json({ error: "Usuário não autenticado" });
            }

            const updateProdutorService = new UpdateProdutorService();

            const produtor = await updateProdutorService.execute({
                id: produtorId,
                nome,
                biografia,
                foto_perfil,
                contato_whatsapp,
                contato_email,
                userId: parseInt(userId) // Passar o ID do usuário para validação de propriedade
            });

            return res.json(produtor);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export {UpdateProdutorController};
