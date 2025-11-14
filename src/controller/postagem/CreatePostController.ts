import { Request, Response } from "express";
import { CreatePostService } from "../../services/postagem/CreatePostService";
import { Multer } from "multer";

class CreatePostController{
    async handle(req: Request, res: Response){
        
        const {titulo, conteudo} = req.body;

        const createPostService = new CreatePostService();
        
        const autorId = Number(req.user_id);

        if(!req.file){
            throw new Error("Falha no upload da imagem")

        } else {
            
            const file = req.file as Express.Multer.File;

            const { filename: banner } = file;

            const post = await createPostService.execute({
                titulo,
                conteudo,
                banner,
                autorId
            });

            return res.json(post)
        }

    }
}

export { CreatePostController }