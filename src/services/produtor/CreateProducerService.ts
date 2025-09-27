import prismaClient from "../../prisma";

interface ProducerRequest{
    nome: string,
    biografia?: string,
    foto_perfil: string,
    contato_whatsapp: string,
    contato_email?: string,

    userId: number

}

class CreateProducerService{
    async execute({nome, biografia, foto_perfil, contato_whatsapp, contato_email, userId}:ProducerRequest){
        
        const producer = await prismaClient.produtor.create({
            data:{
                nome: nome,
                foto_perfil: foto_perfil,
                contato_whatsapp: contato_whatsapp,
                ...(biografia && {biografia}), 
                ...(contato_email && {contato_email}),
                

                userId: userId
            }
        })
            
        return producer;
    }
}

export { CreateProducerService }

