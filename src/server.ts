import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();

const port = 3333;

// Dizer ao express que a troca de dados será feita em JSON
app.use(express.json());


//
app.use(cors());

app.use(router);


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


app.listen(port, ()=> console.log(`Servidor Ligado na porta ${port}`))

