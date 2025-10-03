import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string,
    senha: string
}

class AuthUserService{
    async execute({email, senha}: AuthRequest){

        // Verifica se o email existe
        const user = await prismaClient.usuario.findFirst({
            where: {
                email: email
            }
        })

        if(!user){
            throw new Error("Falha no login")
        }


        // Verifica a senha criptografada
        const passwordComparator = await compare(senha, user.senha); // retorno boleano

        if(!passwordComparator){ 
            throw new Error("Falha no login")
        }


        // Gerar token se tudo deu OK anteriormente
        const token = sign(

            // PAYLOAD
            {
                nome: user.nome,
                email: user.email,
                papel: user.papel
            },

            // SECRET KEY
            process.env.JWT_SECRET as string,


            {
                // Aponta qual o indicador unico do objeto
                subject: user.id.toString(), 

                expiresIn: '30d'
            }
        )


        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            token
        }
    }
}

export {AuthUserService};