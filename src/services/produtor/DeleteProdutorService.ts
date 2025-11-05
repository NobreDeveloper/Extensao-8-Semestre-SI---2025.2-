import prismaClient from "../../prisma";

interface DeleteProdutorRequest{
    producerId: number
}

class DeleteProdutorService{
    async execute({producerId}: DeleteProdutorRequest){

        // Verificação se o produtor existe
        const produtorExists = await prismaClient.produtor.findFirst({
            where:{
                id: producerId
            }
        })

        if(!produtorExists){
            throw new Error("Produtor não encontrado")
        }

        // Deletar o produtor (os produtos serão deletados automaticamente)
        const producer = await prismaClient.produtor.delete({
            where:{
                id: producerId
            }
        });
        
        return producer;
    }
}

export {DeleteProdutorService}
