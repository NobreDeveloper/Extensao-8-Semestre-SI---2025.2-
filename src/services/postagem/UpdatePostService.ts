import prismaClient from "../../prisma"

interface PostRequest{
    postId: number;
    titulo?: string | undefined;
    conteudo?: string | undefined;
    banner?: string | undefined;

    autorId: number;
}

class UpdatePostService{
    async execute({postId, titulo, conteudo, banner, autorId}:PostRequest){

        // Verificação se o usuario existe
        const usuario = await prismaClient.usuario.findUnique({
            where:{
                id: autorId
            }
        })

        if(!usuario){
            throw new Error("Produtor não encontrado!")
        }

        const postagem = await prismaClient.postagem.findUnique({
            where: {
                id: postId
            }
        })

        if(!postagem){
            throw new Error("Postagem não encontrada!")
        }

        if(postagem.autorId != autorId){
            throw new Error("Só é permitido alterar suas próprias postagens!")
        }

        // Montagem do data para substituir ao valor original 
        const data:{ titulo?: string; conteudo?: string, banner?: string } = {}

        if(titulo != undefined){
            data.titulo = titulo
        }

        if(conteudo != undefined){
            data.conteudo = conteudo
        }

        if(banner != undefined){
            data.banner = banner
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