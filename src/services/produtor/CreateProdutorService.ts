import prismaClient from "../../prisma";

interface ProdutorRequest{
    nome: string
    biografia?: string
    foto_perfil: string
    contato_whatsapp: string
    contato_email?: string
    userId: number
}

class CreateProdutorService{
    async execute({nome, biografia, foto_perfil, contato_whatsapp, contato_email, userId}: ProdutorRequest){

        // Verificação se o campo nome foi preenchido
        if (!nome || !foto_perfil || !contato_whatsapp) {
            throw new Error("Campos obrigatórios não preenchidos.");
        }

        // Verificação se o userId é válido
        if(!userId || isNaN(userId)){
            throw new Error("ID do usuário inválido")
        }

        // Verificação se o userId existe
        const userExists = await prismaClient.usuario.findFirst({
            where:{
                id: userId
            }
        })

        if(!userExists){
            throw new Error("Usuário não encontrado")
        }

        // Verificação se já existe um produtor para este usuário
        const produtorAlreadyExists = await prismaClient.produtor.findFirst({
            where:{
                userId: userId
            }
        })

        if(produtorAlreadyExists){
            throw new Error("Já existe um produtor para este usuário")
        }

        // Criar/Inserir a tupla
        const produtor = await prismaClient.produtor.create({
            data:{
                nome: nome,
                biografia: biografia || null,
                foto_perfil: foto_perfil,
                contato_whatsapp: contato_whatsapp,
                contato_email: contato_email || null,
                userId: userId
            },

            // Incluir dados do usuário relacionado
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
        });
        
        // Retorno
        return produtor;
    }
}

export {CreateProdutorService}
