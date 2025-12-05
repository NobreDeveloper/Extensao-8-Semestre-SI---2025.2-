import prismaClient from "../../prisma"

interface UserRequest{
    userId: number
}

class ListUserByIdService{
    async execute({userId}: UserRequest){
        
        const user = await prismaClient.usuario.findUnique({
            where:{
                id: userId
            }
        })

        return user
    }
}

export { ListUserByIdService }