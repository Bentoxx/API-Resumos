import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { TPayload } from "../tipos/TPayload";


export const validarToken = (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {authorization} = req.headers;
    if (!authorization) {
      return res.status(401).json({ mensagem: "Falha na autenticação" });
    }
    const tokenValido = authorization.split(" ")[1];

    jwt.verify(tokenValido, process.env.SECRET as string);

    next();

  } catch (error) {
    if(error instanceof TokenExpiredError || error instanceof JsonWebTokenError){
      return res.status(401).json({
        mensagem: "Falha na autenticação"
      })
    }
    return res.status(500).json({ mensagem: "Erro interno do servidor"});
  }
}