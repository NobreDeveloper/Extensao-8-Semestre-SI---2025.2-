import prismaClient from "../../prisma";

interface UpdateProdutoRequest{
    produtoId: number
    produtorId: number

    nome?: string | undefined
    descricao?: string | undefined
    foto_produto?: string | undefined
}

class UpdateProdutoService{
    async execute({produtoId, produtorId, nome, descricao, foto_produto}: UpdateProdutoRequest){

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

        const data:{nome?: string, descricao?: string, foto_produto?: string} = {};
        
        if(nome != undefined){
            data.nome = nome
        };

        if(descricao != undefined){
            data.descricao = descricao
        };

        if(foto_produto != undefined){
            data.foto_produto = foto_produto
        };

        // Atualizar o produto
        const produto = await prismaClient.produto.update({
            where:{
                id: produtoId,
                produtorId: produtorId
            },
            data
        });
        
        return produto;
    }
}

export {UpdateProdutoService}
