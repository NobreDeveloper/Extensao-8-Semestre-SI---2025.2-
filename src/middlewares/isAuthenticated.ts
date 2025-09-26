import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    
    // Receber o token
    const authToken = req.headers.authorization; // Tipo de autenticação: Bearer Token de Acesso 
     

    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" "); // "Bearer 2140ud0dujsz0uje0jcsa0pjdsejdw" -> "2140ud0dujsz0uje0jcsa0pjdsejdw"  *TOKEN FICTÍCIO
 
    if (!token) {
        return res.status(401).json({ error: "Token não fornecido corretamente." });
    }

    try{

        // Validar token
        const {sub} = verify(
            token,
            process.env.JWT_SECRET as string
            
        ) as PayLoad;

        // Recuperar o id do token e colocar na variavel 
        req.user_id = sub;
        
        return next();
        
    }catch(err){
        return res.status(400).end();
    }

}