import { Router } from "express";

import uploadConfig from './config/multer'

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { can } from "./middlewares/can";

import { AuthUserController } from "./controller/login/AuthUserController";

import { CreateUserController } from "./controller/usuario/CreateUserController";
import { ListUserController } from "./controller/usuario/ListUserController";
import { UpdateUserController } from "./controller/usuario/UpdateUserController";
import { DeleteUserController } from "./controller/usuario/DeleteUserController";

import { CreatePostController } from "./controller/postagem/CreatePostController";
import { ListPostController } from "./controller/postagem/ListPostController";
import { UpdatePostController } from "./controller/postagem/UpdatePostController";
import { DeletePostController } from "./controller/postagem/DeletePostController";

import { CreateProdutorController } from "./controller/produtor/CreateProdutorController";
import { ListProdutorController } from "./controller/produtor/ListProdutorController";
import { UpdateProdutorController } from "./controller/produtor/UpdateProdutorController";
import { DeleteProdutorController } from "./controller/produtor/DeleteProdutorController";

import { CreateProdutoController } from "./controller/produto/CreateProdutoController";
import { ListProdutoController } from "./controller/produto/ListProdutoController";
import { UpdateProdutoController } from "./controller/produto/UpdateProdutoController";
import { DeleteProdutoController } from "./controller/produto/DeleteProdutoController";
import multer from "multer";


const upload = multer(uploadConfig.upload("./tmp"))

const router = Router();

// Rota de Login
    router.post('/api/auth/login', new AuthUserController().handle);


// Rotas para Usuario
    router.get('/api/usuario', new ListUserController().handle);

    router.post('/api/usuario', new CreateUserController().handle);

    router.put('/api/usuario/:id', isAuthenticated, new UpdateUserController().handle);

    router.delete('/api/usuario/:id', isAuthenticated, new DeleteUserController().handle);


    // // Rotas protegidas *(apenas para o usuario autenticado)
    // router.get('/api/usuario/autenticado', isAuthenticated, new ListUserController().handle);

    // // Rota para ADMIN (Somente usuarios com papel 'ADMIN' podem acessar)
    // router.get('/api/admin/usuario', isAuthenticated, can('ADMIN'), new ListUserController().handle);

// Rotas para Produtor
    router.get('/api/produtor', new ListProdutorController().handle);

    router.post('/api/usuario/:userId/produtor', isAuthenticated, upload.single('foto_perfil'), new CreateProdutorController().handle);

    router.put('/api/produtor/:id', isAuthenticated, upload.single('foto_perfil'), new UpdateProdutorController().handle);

    router.delete('/api/produtor/:id', isAuthenticated, new DeleteProdutorController().handle);

// Rotas para Produto
    router.get('/api/produto', new ListProdutoController().handle);

    router.post('/api/produtor/:produtorId/produto', isAuthenticated, upload.single('foto_produto'), new CreateProdutoController().handle);

    router.put('/api/produtor/:produtorId/produto/:produtoId', isAuthenticated, upload.single('foto_produto'), new UpdateProdutoController().handle);

    router.delete('/api/produtor/:produtorId/produto/:produtoId', isAuthenticated, new DeleteProdutoController().handle);

// Rotas para Postagem

    router.get('/api/postagem', new ListPostController().handle);

    router.post('/api/admin/postagem', isAuthenticated, upload.single('banner'), can('ADMIN'), new CreatePostController().handle);

    router.put('/api/admin/postagem/:postId', isAuthenticated, upload.single('banner'), can('ADMIN'),  new UpdatePostController().handle);

    router.delete('/api/admin/postagem/:postId', isAuthenticated, can('ADMIN'), new DeletePostController().handle);


export {router};