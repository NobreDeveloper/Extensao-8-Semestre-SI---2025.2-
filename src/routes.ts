import { Request, Response, Router } from "express";

const router = Router();

router.get('/api', (req: Request, res: Response)=>{
    return res.json({ message: 'Mensagem enviada com sucesso'})
});

export {router};