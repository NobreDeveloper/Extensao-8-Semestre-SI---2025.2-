import prismaClient from "../../prisma";

interface ProdutorRequest{
    produtorId: number
    biografia?: string | undefined
    foto_perfil?: string | undefined
    contato_whatsapp?: string | undefined
    contato_email?: string | undefined
}

class UpdateProdutorService{
    async execute({produtorId, biografia, foto_perfil, contato_whatsapp, contato_email}: ProdutorRequest){

        const producerExist = await prismaClient.produtor.findUnique({
            where:{
                id: produtorId
            }
        })

        if(!producerExist){
            throw new Error("Produtor não encontrado")
        }

        const data:{ biografia?: string, foto_perfil?: string, contato_whatsapp?: string, contato_email?: string} = {}
        

        if(biografia != undefined){ 
            data.biografia = biografia
        }

        if(foto_perfil != undefined){ 
            data.foto_perfil = foto_perfil
        }

        if(contato_whatsapp != undefined){ 
            data.contato_whatsapp = contato_whatsapp
        }

        if(contato_email != undefined){ 
            data.contato_email = contato_email
        }

        const producer = await prismaClient.produtor.update({
            where:{
                id: produtorId
            },

            data
        })

        return producer;
    }
}

export {UpdateProdutorService}
