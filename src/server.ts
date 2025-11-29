import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes';
import 'dotenv/config'
import path from 'path';
import swaggerUi from "swagger-ui-express"

import swaggerDocs from './swagger.json'

const app = express();

app.use(cors());

// Dizer ao express que a troca de dados será feita em JSON
app.use(express.json());

app.use(router);



app.use(
    '/api/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)


// Documentação
app.use(
    '/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs)
)





// Todas as rotas passarão por aqui fazendo tratativa de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
});


app.listen(3333, ()=> console.log(`Servidor ligado`))

