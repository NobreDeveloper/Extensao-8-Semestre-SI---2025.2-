import prismaClient from "../../prisma";

interface DeleteProdutorRequest{
    id: number
}

class DeleteProdutorService{
    async execute({id}: DeleteProdutorRequest){

        // Verificação se o produtor existe
        const produtorExists = await prismaClient.produtor.findFirst({
            where:{
                id: id
            }
        })

        if(!produtorExists){
            throw new Error("Produtor não encontrado")
        }

        // Deletar o produtor (os produtos serão deletados automaticamente)
        await prismaClient.produtor.delete({
            where:{
                id: id
            }
        });
        
        return { message: "Produtor deletado com sucesso" };
    }
}

export {DeleteProdutorService}
