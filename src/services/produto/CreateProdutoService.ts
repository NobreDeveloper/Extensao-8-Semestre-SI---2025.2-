import prismaClient from "../../prisma";

interface ProdutoRequest{
    nome: string
    descricao: string
    foto_produto: string
    produtorId: number
}

class CreateProdutoService{
    async execute({nome, descricao, foto_produto, produtorId}: ProdutoRequest){

        // Verificação se o campo nome foi preenchido
        if(!nome){
            throw new Error("Nome é obrigatório")
        }

        // Verificação se o campo descricao foi preenchido
        if(!descricao){
            throw new Error("Descrição é obrigatória")
        }

        // Verificação se o campo foto_produto foi preenchido
        if(!foto_produto){
            throw new Error("Foto do produto é obrigatória")
        }

        // Verificação se o produtorId existe
        const produtorExists = await prismaClient.produtor.findFirst({
            where:{
                id: produtorId
            }
        })

        if(!produtorExists){
            throw new Error("Produtor não encontrado")
        }

        // Criar/Inserir a tupla
        const produto = await prismaClient.produto.create({
            data:{
                nome: nome,
                descricao: descricao,
                foto_produto: foto_produto,
                produtorId: produtorId
            },

            // Incluir dados do produtor relacionado
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
        
        // Retorno
        return produto;
    }
}

export {CreateProdutoService}
