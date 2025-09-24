import { Router } from "express";
import { CreateUserController } from "./controller/usuario/CreateUserController";
import { AuthUserController } from "./controller/usuario/AuthUserController";
import { ListUserController } from "./controller/usuario/ListUserController";

const router = Router();

// Público
router.get('/api/usuario', new ListUserController().handle)


// Rotas para Usuario
router.post('/api/usuario', new CreateUserController().handle)

router.post('/api/auth/login', new AuthUserController().handle)


// Rotas para Produtor


// Rotas para Postagem


export {router};