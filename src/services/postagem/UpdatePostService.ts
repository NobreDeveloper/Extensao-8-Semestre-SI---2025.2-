import prismaClient from "../../prisma"

interface PostRequest{
    postId: number;
    titulo?: string;
    conteudo?: string;
    usuarioId: number;
}

class UpdatePostService{
    async execute({postId, titulo, conteudo, usuarioId}:PostRequest){

        // Verificação se o usuario existe
        const usuario = await prismaClient.usuario.findUnique({
            where:{
                id: usuarioId
            }
        })

        if(!usuario){
            throw new Error("Produtor não encontrado!")
        }

        
        // Verificação se o usuário é um Produtor
        if(usuario.papel != "PRODUTOR"){
            throw new Error("Somente produtor podem editar suas postagens!")
        }


        // Verificação se a postagem existe e pertence ao usuário 
        const postagem = await prismaClient.postagem.findUnique({
            where: {
                id: postId
            }
        })

        if(!postagem){
            throw new Error("Postagem não encontrada!")
        }

        if(postagem.autorId != usuarioId){
            throw new Error("Só é permitido alterar suas próprias postagens!")
        }

        // Montagem do data para substituir ao valor original 
        const data:{ titulo?: string; conteudo?: string } = {}

        if(titulo != undefined){
            data.titulo = titulo
        }

        if(conteudo != undefined){
            data.conteudo = conteudo
        }


        // Verificação se foi informado algo nos campos opcionais
        if (Object.keys(data).length === 0) {
            throw new Error("Nenhum campo para atualizar foi informado.");
        }
        

        // Atualização do valor original
        const post = await prismaClient.postagem.update({

            where:{
                id: postId
            },
            data
        });

        return post;
    };
}

export { UpdatePostService }