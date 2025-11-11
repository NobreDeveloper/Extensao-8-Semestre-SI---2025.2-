
import prismaClient from "../../prisma";

interface ProdutorRequest{
    biografia?: string
    foto_perfil: string
    contato_whatsapp: string
    contato_email?: string
    userId: number
}

class CreateProdutorService{
    async execute({biografia, foto_perfil, contato_whatsapp, contato_email, userId}: ProdutorRequest){

        const user = await prismaClient.usuario.findUnique({
            where:{
                id: userId
            }
        }) 

        if(!user){
            throw new Error("Usuário não encontrado")
        }

        const producerExist = await prismaClient.produtor.findUnique({
            where:{
                userId
            }
        })

        if(producerExist){
            throw new Error("Produtor já cadastrado")
        }

        const data:{biografia?: string, contato_email?: string} = {}

        if(biografia != undefined){
            data.biografia = biografia
        }

        if(contato_email != undefined){
            data.contato_email = contato_email
        }

        const producer = await prismaClient.produtor.create({
            data:{
                nome: user.nome,
                foto_perfil, 
                contato_whatsapp, 
                userId,
                ...data
            }
        })

        return producer;

    }
}

export {CreateProdutorService}
