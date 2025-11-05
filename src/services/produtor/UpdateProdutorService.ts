import prismaClient from "../../prisma";

interface UpdateProdutorRequest{
    producerId: number
    biografia?: string
    foto_perfil?: string
    contato_whatsapp?: string
    contato_email?: string
}

class UpdateProdutorService{
    async execute({producerId, biografia, foto_perfil, contato_whatsapp, contato_email}: UpdateProdutorRequest){

        const producerExist = await prismaClient.produtor.findUnique({
            where:{
                id: producerId
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
                id: producerId
            },

            data
        })

        return producer;
    }
}

export {UpdateProdutorService}
