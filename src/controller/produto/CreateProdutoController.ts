import { Request, Response } from "express";
import { CreateProdutoService } from "../../services/produto/CreateProdutoService";
import Multer from 'multer'

class CreateProdutoController {
  async handle(req: Request, res: Response) {
    const {nome, descricao} = req.body;
    
    const produtorId = Number(req.params.produtorId)

    const createProdutoService = new CreateProdutoService();

    if(!('file' in req) || !req.file){
      throw new Error("Falha no upload da imagem")

    } else { 

      const { filename: foto_produto } = req.file as Express.Multer.File;

      const produto = await createProdutoService.execute({
        nome,
        descricao,
        foto_produto,
        produtorId
      })
  
      return res.json(produto)
    }

  }
}

export { CreateProdutoController };