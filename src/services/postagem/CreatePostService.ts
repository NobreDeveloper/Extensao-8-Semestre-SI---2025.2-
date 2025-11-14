import prismaClient from "../../prisma";

interface PostRequest{
    titulo: string
    conteudo: string
    banner: string

    autorId: number
}

class CreatePostService{
    async execute({titulo, conteudo, autorId, banner}: PostRequest){

        // Verificação se o usuário realmente existe
        const usuario = await prismaClient.usuario.findUnique({
            where:{
                id: autorId
            }
        })

        if(!usuario){
            throw new Error("Usuário não encontrado.")
        }

        // Criação do Post
        const post = await prismaClient.postagem.create({
            data:{
                titulo: titulo,
                conteudo: conteudo,
                banner: banner,
                
                autorId: autorId
            }
        })
        
        return post;

    };
}

export { CreatePostService }