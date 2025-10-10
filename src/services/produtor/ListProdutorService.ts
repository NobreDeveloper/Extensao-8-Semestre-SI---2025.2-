import prismaClient from "../../prisma";

class ListProdutorService{
    async execute(){
        const produtores = await prismaClient.produtor.findMany({
            include:{
                usuario: {
                    select:{
                        id: true,
                        nome: true,
                        email: true,
                        papel: true
                    }
                },
                produtos: true
            },
            orderBy:{
                createdAt: 'desc'
            }
        });

        return produtores;
    }
}

export {ListProdutorService}
