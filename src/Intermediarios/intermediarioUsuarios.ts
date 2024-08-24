import { NextFunction, Request, Response } from "express";

export const validacaoCorpoCadastroUsuario = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {nome, email, senha} = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({mensagem: "Todos os campos são obrigatórios"});
    };
    next();
  } catch (error) {
    return res.status(500).json({mensagem: "Erro interno do servidor"});
  }
}

export const validacaoCorpoLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, senha} = req.body;
    if (!email || !senha) {
      return res.status(400).json({mensagem: "Todos os campos são obrigatórios"});
    };
    next();
  } catch (error) {
    return res.status(500).json({mensagem: "Erro interno do servidor"});
  }
}
