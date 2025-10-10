import prismaClient from "../../prisma"

class ListPostService{
    async execute(){
        const posts = await prismaClient.postagem.findMany({
            select:{
                id: true,
                autorId: true,
                titulo: true,
                conteudo: true,
                data_publicacao: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return posts;
    };
}

export { ListPostService }