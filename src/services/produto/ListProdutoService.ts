import prismaClient from "../../prisma";

class ListProdutoService{
    async execute(){
        const produtos = await prismaClient.produto.findMany({
            include:{
                produtor: {
                    include:{
                        usuario: {
                            select:{
                                id: true,
                                nome: true,
                                email: true,
                                papel: true
                            }
                        }
                    }
                }
            },
            orderBy:{
                createdAt: 'desc'
            }
        });

        return produtos;
    }
}

export {ListProdutoService}
