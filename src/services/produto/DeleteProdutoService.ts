import prismaClient from "../../prisma";

interface DeleteProdutoRequest{
    id: number
}

class DeleteProdutoService{
    async execute({id}: DeleteProdutoRequest){

        // Verificação se o produto existe
        const produtoExists = await prismaClient.produto.findFirst({
            where:{
                id: id
            }
        })

        if(!produtoExists){
            throw new Error("Produto não encontrado")
        }

        // Deletar o produto
        await prismaClient.produto.delete({
            where:{
                id: id
            }
        });
        
        return { message: "Produto deletado com sucesso" };
    }
}

export {DeleteProdutoService}
