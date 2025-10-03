import prismaClient from "../../prisma"


interface UserRequest{
    userId: number
}

class DeleteUserService{
    async execute({userId}:UserRequest){

        const user = await prismaClient.usuario.delete({
            where:{
                id: userId
            }
        })

        return user;

    }
}

export { DeleteUserService }