import prismaClient from "../../prisma";

class ListUserService{
    async execute(){
        const usuarios = await prismaClient.usuario.findMany({
            select:{
                id: true,
                nome: true,
                email: true,
                papel: true
            }
        })

        return usuarios;
    };
}

export { ListUserService }