import { Request, Response } from "express";
import { CreatePostService } from "../../services/postagem/CreatePostService";

class CreatePostController{
    async handle(req: Request, res: Response){
        
        const {titulo, conteudo} = req.body;

        const autorId = Number(req.user_id);

        const createPostService = new CreatePostService();
        
        const post = await createPostService.execute({
            titulo,
            conteudo,
            autorId
        });
        
        return res.json(post)
    }
}

export { CreatePostController }