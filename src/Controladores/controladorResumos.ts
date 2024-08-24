import { Request, Response,} from "express";
import { extrairIdDoToken } from "../utils/extrairIdDoToken";
import pool from "../conexaoBd";

export const criarResumo = async (req: Request, res: Response) => {
  const { materiaId, titulo, topicos } = req.body;

  if (!materiaId ||!topicos) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
  }

  if (topicos.length === 0) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
  }

  const materiaExiste = await pool.query(`SELECT * FROM materias WHERE id = $1`, [materiaId]);

  if (materiaExiste.rowCount === 0) {
    return res.status(404).json({ mensagem: 'Matéria não encontrada' });
  }

  const descricao = "Em uma API REST, rotas são os pontos de entrada que mapeiam URLs específicas para ações específicas, permitindo que clientes interajam com o servidor. Intermediários, ou middlewares, são funções que interceptam as requisições e respostas, podendo realizar tarefas como autenticação, registro de logs e manipulação de dados antes que estes cheguem aos controladores. Os controladores, por sua vez, são responsáveis por implementar a lógica de negócios da aplicação, processando as requisições, interagindo com o banco de dados ou outros serviços, e retornando as respostas apropriadas aos clientes. Dessa forma, rotas definem o caminho, intermediários manipulam o fluxo de dados e controladores executam a lógica principal, colaborando para criar uma arquitetura modular e organizada em uma API REST.";

  const query = `
    INSERT INTO resumos (materia_id, titulo, topicos, descricao)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [materiaId, titulo || 'Sem título', topicos.join(', '), descricao];

  try {
    const resultado = await pool.query(query, values);
    return res.status(201).json(resultado.rows[0]);
  } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno"});
  }
}

export const listarResumo = async (req: Request, res: Response) => {
  const { materia } = req.query
  const userId = req.user?.id

  try {
      if (materia) {
          const materiaEncontrada = await pool.query(`select * from materias where nome = $1`, [materia])
          if (!materiaEncontrada.rowCount) {
              return res.status(200).json([])
          }

          const { id } = materiaEncontrada.rows[0]

          const resumos = await pool.query(`select id, usuario_id as "usuarioId",
            materia_id as "materia", titulo, topicos, descricao, criado
            from resumos where usuario_id = $1 and materia_id = $2`, [userId, id])

          return res.status(200).json(resumos.rows)
      }
      const resumos = await pool.query(`select id, usuario_id as "usuarioId",
        materia_id as "materia", titulo, topicos, descricao, criado
        from resumos where usuario_id = $1`, [userId])

      return res.status(200).json(resumos.rows)
  } catch (error) {
      return res.status(505).json({ mensagen: "Erro interno" })
  }
}

export const editarReumo = async(req: Request , res: Response) => {
  const { id } = req.params;
  const { materiaId, titulo } = req.body;

  if (!materiaId ||!titulo) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }

  const resumoExiste = await pool.query(`SELECT * FROM resumos WHERE id = $1`, [id]);

  if (resumoExiste.rowCount === 0) {
    return res.status(404).json({ mensagem: "Resumo não encontrado" });
  }

  const materiaExiste = await pool.query(`SELECT * FROM materias WHERE id = $1`, [materiaId]);

  if (materiaExiste.rowCount === 0) {
    return res.status(404).json({ mensagem: "Matéria não encontrada" });
  }

  const query = `
    UPDATE resumos
    SET materia_id = $1, titulo = $2
    WHERE id = $3
    RETURNING *
  `;

  const values = [materiaId, titulo, id];

  try {
    const resultado = await pool.query(query, values);
    return res.status(200).json(resultado.rows[0]);
  } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno" });
  }
}

export const deletarResumo = async(req: Request , res: Response) => {
  const {authorization} = req.headers
  const {id} = req.params

  try {
    const idDoUsuario = extrairIdDoToken(authorization as string)
    if(idDoUsuario !== Number(id)){
      return res.status(404).json({mensagem: "Resumo não encontrado"})
    }

    const resumoDeletado = await pool.query(`SELECT * FROM resumos WHERE id = $1;`,[idDoUsuario])

    await pool.query(`DELETE FROM resumos WHERE id = $1;`,[idDoUsuario])

    return res.status(204).json(resumoDeletado.rows)
    
  } catch (error) {
    return res.status(500).json({mensagem: "Erro interno do Servidor!"})
  }
}