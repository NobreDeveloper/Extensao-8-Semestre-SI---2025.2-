import { Request, Response } from "express";
import { UpdatePostService } from "../../services/postagem/UpdatePostService";

class UpdatePostController{
    async handle(req: Request, res: Response){

        const postId = Number(req.params.id)
        const {titulo, conteudo} = req.body;

        const usuarioId = Number(req.user_id)

        const updatePostService = new UpdatePostService();

        const post = await updatePostService.execute({
            postId,
            usuarioId,
            titulo,
            conteudo
        })

        return res.json(post)

    }
}

export { UpdatePostController }
