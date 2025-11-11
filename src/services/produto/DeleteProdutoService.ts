import prismaClient from "../../prisma";

interface DeleteProdutoRequest{
    produtoId: number
    produtorId: number
}

class DeleteProdutoService{
    async execute({produtoId, produtorId}: DeleteProdutoRequest){

        // Verificação se o produto existe
        const produtoExists = await prismaClient.produto.findFirst({
            where:{
                id: produtoId,
                produtorId: produtorId
            }
        })

        if(!produtoExists){
            throw new Error("Produto não encontrado")
        }

        // Deletar o produto
        const produto = await prismaClient.produto.delete({
            where:{
                id: produtoId,
                produtorId: produtorId
            }
        });
        
        return produto;
    }
}

export {DeleteProdutoService}
