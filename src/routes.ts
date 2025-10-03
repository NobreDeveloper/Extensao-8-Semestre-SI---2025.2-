import { Router } from "express";
import { CreateUserController } from "./controller/usuario/CreateUserController";
import { AuthUserController } from "./controller/login/AuthUserController";
import { ListUserController } from "./controller/usuario/ListUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { can } from "./middlewares/can";
import { ListPostController } from "./controller/postagem/ListPostController";
import { CreatePostController } from "./controller/postagem/CreatePostController";
import { UpdatePostController } from "./controller/postagem/UpdatePostController";
import { DeletePostController } from "./controller/postagem/DeletePostController";
import { DeleteUserController } from "./controller/usuario/DeleteUserController";
import { UpdateUserController } from "./controller/usuario/UpdateUserController";

const router = Router();

// Rota de Login
    router.post('/api/auth/login', new AuthUserController().handle);


// Rotas para Usuario
    router.get('/api/usuario', new ListUserController().handle);

    router.post('/api/usuario', new CreateUserController().handle);

    router.put('/api/usuario/:id', new UpdateUserController().handle);

    router.delete('/api/usuario/:id', new DeleteUserController().handle);


    // // Rotas protegidas *(apenas para o usuario autenticado)
    // router.get('/api/usuario/autenticado', isAuthenticated, new ListUserController().handle);

    // // Rota para ADMIN (Somente usuarios com papel 'ADMIN' podem acessar)
    // router.get('/api/admin/usuario', isAuthenticated, can('ADMIN'), new ListUserController().handle);


// Rotas para Produtor


// Rotas para Postagem

    router.get('/api/admin/postagem', isAuthenticated, can('ADMIN'), new ListPostController().handle);

    router.post('/api/admin/postagem', isAuthenticated, can('ADMIN'), new CreatePostController().handle);

    router.put('/api/admin/postagem/:id', isAuthenticated, can('ADMIN'), new UpdatePostController().handle);

    router.delete('/api/admin/postagem/:id', isAuthenticated, can('ADMIN'), new DeletePostController().handle);



export {router};