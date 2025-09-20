import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";

const router = Router();

// Rotas para tabela Usuario
router.post('/usuario', new CreateUserController().handle)

router.post('/login', new AuthUserController().handle)

export {router};