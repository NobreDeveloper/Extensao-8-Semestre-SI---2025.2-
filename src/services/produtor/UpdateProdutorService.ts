import prismaClient from "../../prisma";

interface UpdateProdutorRequest{
    id: number
    nome?: string
    biografia?: string
    foto_perfil?: string
    contato_whatsapp?: string
    contato_email?: string
    userId: number // ID do usuário autenticado
}

class UpdateProdutorService{
    async execute({id, nome, biografia, foto_perfil, contato_whatsapp, contato_email, userId}: UpdateProdutorRequest){

        // Verificação se o produtor existe
        const produtorExists = await prismaClient.produtor.findFirst({
            where:{
                id: id
            },
            include: {
                usuario: {
                    select: {
                        id: true,
                        papel: true
                    }
                }
            }
        })

        if(!produtorExists){
            throw new Error("Produtor não encontrado")
        }

        // Verificação de propriedade: só o dono ou ADMIN pode atualizar
        const isOwner = produtorExists.userId === userId;
        const isAdmin = produtorExists.usuario.papel === 'ADMIN';

        if(!isOwner && !isAdmin){
            throw new Error("Você não tem permissão para atualizar este produtor")
        }

        // Preparar dados para atualização (apenas campos fornecidos)
        const updateData: any = {};
        
        if(nome !== undefined) updateData.nome = nome;
        if(biografia !== undefined) updateData.biografia = biografia;
        if(foto_perfil !== undefined) updateData.foto_perfil = foto_perfil;
        if(contato_whatsapp !== undefined) updateData.contato_whatsapp = contato_whatsapp;
        if(contato_email !== undefined) updateData.contato_email = contato_email;

        // Atualizar o produtor
        const produtor = await prismaClient.produtor.update({
            where:{
                id: id
            },
            data: updateData,
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
            }
        });
        
        return produtor;
    }
}

export {UpdateProdutorService}
