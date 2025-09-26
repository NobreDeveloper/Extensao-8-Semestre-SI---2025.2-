import { Router } from "express";
import { CreateUserController } from "./controller/usuario/CreateUserController";
import { AuthUserController } from "./controller/usuario/AuthUserController";
import { ListUserController } from "./controller/usuario/ListUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

const router = Router();

// Rotas para Usuario
router.post('/api/usuario', new CreateUserController().handle);
router.post('/api/auth/login', new AuthUserController().handle);

// Rotas protegidas *(apenas para o usuario autenticado)
router.get('/api/usuario/autenticado', isAuthenticated, new ListUserController().handle);

// Rota para ADMIN (Somente usuarios com papel 'ADMIN' podem acessar)
router.get('/api/admin/usuario', isAuthenticated, isAdmin('ADMIN'), new ListUserController().handle);

// Rotas para Usuario
router.post('/api/usuario', new CreateUserController().handle)

router.post('/api/auth/login', new AuthUserController().handle)


// Rotas para Produtor


// Rotas para Postagem

export {router};