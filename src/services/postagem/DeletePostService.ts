import prismaClient from "../../prisma"

interface PostRequest{
    postId: number
}

class DeletePostService{
    async execute({postId}:PostRequest){

        const post = await prismaClient.postagem.delete({
            where:{
                id: postId
            }
        })

        return post;

    }
}

export { DeletePostService }