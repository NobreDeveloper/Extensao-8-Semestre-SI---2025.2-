import { Request, Response } from "express";
import { ListPostService } from "../../services/postagem/ListPostService";

class ListPostController{
    async handle(req: Request, res: Response){

        const listPostService = new ListPostService();
    
        const posts = await listPostService.execute();

        return res.json(posts);
    
    }
}

export { ListPostController }