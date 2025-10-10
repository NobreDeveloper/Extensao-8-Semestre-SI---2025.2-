import { Request, Response } from "express";
import { DeletePostService } from "../../services/postagem/DeletePostService";

class DeletePostController{
    async handle(req: Request, res: Response){

        const postId = Number(req.params.id)

        const deletePostService = new DeletePostService();

        const post = await deletePostService.execute({
            postId
        });

        return res.json(post);
    }
}

export { DeletePostController }