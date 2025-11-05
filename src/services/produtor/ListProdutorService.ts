import prismaClient from "../../prisma";

class ListProdutorService{
    async execute(){
        const producer = await prismaClient.produtor.findMany()

        return producer;
    }
}

export {ListProdutorService}
