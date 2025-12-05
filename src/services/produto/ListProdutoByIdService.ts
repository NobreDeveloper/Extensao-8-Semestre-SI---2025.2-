import prismaClient from "../../prisma"

interface ProdutoRequest{
    produtoId: number,
    produtorId: number
}

class ListProdutoByIdService{
    async execute({produtoId, produtorId}: ProdutoRequest){
        
        const produto = await prismaClient.produto.findUnique({
            where:{
                id: produtoId,
                produtorId: produtorId
            }
        })

        return produto
    }
}

export { ListProdutoByIdService }