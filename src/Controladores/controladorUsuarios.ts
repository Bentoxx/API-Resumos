import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../conexaoBd";
import "dotenv/config"
import jwt from "jsonwebtoken";
import { TPayload } from "../tipos/TPayload";

export const cadastroUsuario = async (req: Request, res: Response) => {
  const {nome, email, senha} = req.body;

  try {
    const usuarioJaCadastrado = await pool.query(`SELECT email FROM usuarios WHERE email = $1`, [email]);

    if(usuarioJaCadastrado.rowCount) {
      return res.status(400).json({mensagem: "E-mail já cadastrado"});
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario:{nome: string, email: string, senha: any} = {
      nome,
      email,
      senha: senhaCriptografada,
    };

    const {rows} = await pool.query(`INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`,
      [novoUsuario.nome, novoUsuario.email, novoUsuario.senha]);

    const usuarioRetornado={
      id: rows[0].id,
      nome: rows[0].nome,
      email: rows[0].email
    }

    return res.status(201).json(usuarioRetornado);

  } catch (error:any) {
    console.log(error.message)
    return res.status(500).json({mensagem: "Erro interno do servidor"});
  }

}
export const loginUsuario = async (req: Request, res: Response) => {
  const {email, senha} = req.body;
  const respostaBancoEmail = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
    try {
    //checar email
    if (!respostaBancoEmail.rowCount){
      return res.status(400).json({mensagem: "E-mail ou senha inválidos"})
    }
    //checar senha
    const senhaCorreta = await bcrypt.compare(senha, respostaBancoEmail.rows[0].senha);
    if (!senhaCorreta){
      return res.status(400).json({mensagem: "E-mail ou senha inválidos"})
    }
    const usuario=respostaBancoEmail.rows[0];
    const token = jwt.sign({id: usuario.id, nome: usuario.nome, email: usuario.email}, process.env.SECRET!, {expiresIn: "1h"});
    return res.status(200).json({token});
  }catch (error) {
    return res.status(500).json({mensagem: "Erro interno do servidor"});
  }

}
