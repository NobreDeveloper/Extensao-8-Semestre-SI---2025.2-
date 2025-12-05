import prismaClient from "../../prisma"

interface ProdutorRequest{
    produtorId: number
}

class ListProdutorByIdService{
    async execute({produtorId}: ProdutorRequest){
        
        const produtor = await prismaClient.produtor.findUnique({
            where:{
                id: produtorId
            }
        })

        return produtor
    }
}

export { ListProdutorByIdService }