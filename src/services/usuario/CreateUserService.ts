import { hash } from "bcryptjs";
import prismaClient from "../../prisma";


interface UserRequest{
    email: string
    senha: string
    nome: string
    papel?: string
}

class CreateUserService{
    async execute({email, senha, nome, papel}:UserRequest){

        // Verificação se o campo email foi preenchido
        if(!email){
            throw new Error("Email incorreto")
        }

        if(!papel){
            throw new Error("A atribuição de função é necessária")
        }


        // Verificação se o email já existe
        const userAlreadyExist = await prismaClient.usuario.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExist){
            throw new Error("Já existe um usuário com esse email")
        }


        // ADMIN ou PRODUTOR
        const userRole = papel == "ADMIN" ? "ADMIN" : "PRODUTOR";


        // Criptografia de senha
        const hashPassword = await hash(senha, 8)


        // Criar/Inserir a tupla
        const user = prismaClient.usuario.create({
            data:{
                email: email,
                senha: hashPassword,
                nome: nome, 
                papel: userRole
            },

            // Remover o campo senha no retorno ao usuário
            select:{
                id: true,
                nome: true,
                papel: true,
                email: true
            }
        });
        

        // Retorno
        return user;
    }
}

export {CreateUserService}