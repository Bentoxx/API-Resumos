import { Request, Response} from 'express';
import pool from '../conexaoBd';

export const listarMateria = async (req: Request, res: Response) => {
  try {
    const materia = await pool.query (`SELECT * from materias`)
    return res.status(200).json(materia.rows)

  } catch (error) {
    return res.status(500).json({mensagem: "Erro Interno"})
  }
}
