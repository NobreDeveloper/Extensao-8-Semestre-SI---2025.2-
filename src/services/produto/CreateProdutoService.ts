import prismaClient from "../../prisma"

interface ProdutoRequest{
    nome: string,
    descricao: string,
    foto_produto: string

    produtorId: number
}

class CreateProdutoService{
    async execute({nome, descricao, foto_produto, produtorId}: ProdutoRequest){

        const produtorExist = await prismaClient.produtor.findUnique({
            where:{
                id: produtorId
            }
        })

        if(!produtorExist){
            throw new Error("Produtor não encontrado no sistema")
        }
        
        const productAlreadyExist = await prismaClient.produto.findFirst({
            where:{
                nome: nome,
                produtorId: produtorId
            }
        })

        if(productAlreadyExist){
            throw new Error("Produto já cadastrado no sistema")
        }

        const produto = await prismaClient.produto.create({
            data:{
                nome: nome,
                descricao: descricao,
                foto_produto: foto_produto,
                produtorId: produtorId
            }
        })

        return produto;

    }
}

export { CreateProdutoService }