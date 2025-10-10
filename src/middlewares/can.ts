import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string;
    papel: 'ADMIN' | 'PRODUTOR';
}

export function can(papelRequerido: 'ADMIN' | 'PRODUTOR') {
    return (req: Request, res: Response, next: NextFunction) => {
        const authToken = req.headers.authorization;

        if (!authToken) {
            return res.status(401).end();
        }

        const [, token] = authToken.split(" ");

        try {
            if (!token) {
                return res.status(401).json({ error: "Token não fornecido corretamente." });
            }
            const { sub, papel } = verify(
                token,
                process.env.JWT_SECRET as string
            ) as PayLoad;


            // Verificar se o papel do usuario no token é o mesmo que o papel requer para rota
            if (papel !== papelRequerido) {
                return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para esta ação.' })
            }

            // Repassa o ID e o papel do usuárop pra proxima rota, se for necessario
            req.user_id = sub;
            (req as any).user_papel = papel;

            return next();
        } catch (err) {
            return res.status(400).end();
        }
    }
}
