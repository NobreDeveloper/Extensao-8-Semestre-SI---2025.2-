import { Request, Response } from "express";
import { UpdatePostService } from "../../services/postagem/UpdatePostService";
import Multer from "multer";

class UpdatePostController{
    async handle(req: Request, res: Response){

        const postId = Number(req.params.postId)

        const {titulo, conteudo} = req.body;

        const autorId = Number(req.user_id)

        const file = (req as any).file as Express.Multer.File | undefined

        const banner = file?.filename;

        const updatePostService = new UpdatePostService();

        const post = await updatePostService.execute({
            postId,
            autorId,
            titulo,
            banner,

            conteudo
        })

        return res.json(post)

    }
}

export { UpdatePostController }
