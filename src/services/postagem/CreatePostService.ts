import prismaClient from "../../prisma";

interface PostRequest{
    titulo: string;
    conteudo: string;
    
    autorId: number;
}

class CreatePostService{
    async execute({titulo, conteudo, autorId}: PostRequest){

        // Verificação se o usuário realmente existe
        const usuario = await prismaClient.usuario.findUnique({
            where:{
                id: autorId
            }
        })

        if(!usuario){
            throw new Error("Usuário não encontrado.")
        }

        if(usuario.papel != "PRODUTOR"){
            throw new Error("Somente produtores podem criar postagens.")
        }

        // Criação do Post
        const post = await prismaClient.postagem.create({
            data:{
                titulo: titulo,
                conteudo: conteudo,
                
                autorId: autorId
            }
        })
        
        return post;

    };
}

export { CreatePostService }