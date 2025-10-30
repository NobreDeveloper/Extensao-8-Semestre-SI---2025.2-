
import { Papel } from "@prisma/client";
import prismaClient from "../../prisma";

interface UserRequest{
    usuarioId: number,
    email?: string,
    senha?: string,
    nome?: string,
    papel?: Papel
}

class UpdateUserService{
    async execute({ usuarioId, email, senha, nome, papel }:UserRequest){

        // Verificação se o usuario existe
        const usuario = await prismaClient.usuario.findUnique({
            where:{
                id: usuarioId
            }
        })

        if(!usuario){
            throw new Error("Usuário não encontrado")
        }


        // Verificação de alteração do papel do usuario 
        if(usuario.papel !== "ADMIN" && papel){
            throw new Error("Somente administradores podem alterar seu papel")
        }


        // Montagem para substituição
        const data:{ email?:string, senha?:string, nome?:string, papel?:{ set: Papel}} = {};

        if(email != undefined){
            data.email = email
        }

        if(senha != undefined){
            data.senha = senha
        }

        if(nome != undefined){
            data.nome = nome
        }

        if(papel != undefined){
            data.papel = { set: papel as Papel }
        }

        
        // Verificação se foi informado algo a ser alterado
        if(Object.keys(data).length === 0){
            throw new Error("Nenhum campo para atualizar foi informado.");
        }


        // Atualização do valor original
        const user = await prismaClient.usuario.update({
            where:{
                id: usuarioId
            },
            
            data
        })

        return user;
    }
}

export { UpdateUserService }