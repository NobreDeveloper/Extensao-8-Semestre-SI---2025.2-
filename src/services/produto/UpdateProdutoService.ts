import prismaClient from "../../prisma";

interface UpdateProdutoRequest{
    id: number
    nome?: string
    descricao?: string
    foto_produto?: string
    produtorId?: number
    userId: number // ID do usuário autenticado
}

class UpdateProdutoService{
    async execute({id, nome, descricao, foto_produto, produtorId, userId}: UpdateProdutoRequest){

        // Verificação se o produto existe
        const produtoExists = await prismaClient.produto.findFirst({
            where:{
                id: id
            },
            include: {
                produtor: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                papel: true
                            }
                        }
                    }
                }
            }
        })

        if(!produtoExists){
            throw new Error("Produto não encontrado")
        }

        // Verificação de propriedade: só o dono do produtor ou ADMIN pode atualizar
        const isOwner = produtoExists.produtor.userId === userId;
        const isAdmin = produtoExists.produtor.usuario.papel === 'ADMIN';

        if(!isOwner && !isAdmin){
            throw new Error("Você não tem permissão para atualizar este produto")
        }

        // Se produtorId foi fornecido, verificar se existe
        if(produtorId !== undefined){
            const produtorExists = await prismaClient.produtor.findFirst({
                where:{
                    id: produtorId
                }
            })

            if(!produtorExists){
                throw new Error("Produtor não encontrado")
            }
        }

        // Preparar dados para atualização (apenas campos fornecidos)
        const updateData: any = {};
        
        if(nome !== undefined) updateData.nome = nome;
        if(descricao !== undefined) updateData.descricao = descricao;
        if(foto_produto !== undefined) updateData.foto_produto = foto_produto;
        if(produtorId !== undefined) updateData.produtorId = produtorId;

        // Atualizar o produto
        const produto = await prismaClient.produto.update({
            where:{
                id: id
            },
            data: updateData,
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
            }
        });
        
        return produto;
    }
}

export {UpdateProdutoService}
