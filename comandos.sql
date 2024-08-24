-- Criar o banco de dados
CREATE DATABASE resume_ai;
-- Criar a tabela usuarios
CREATE TABLE "public"."usuarios" (
  "id" serial NOT NULL,
  "nome" varchar(150) NOT NULL,
  "email" varchar(250) NOT NULL,
  "senha" varchar(50) NOT NULL,
  PRIMARY KEY ("id")
)
;
-- Criar a tabela materias
CREATE TABLE "materias" (
  "id" serial NOT NULL,
  "nome" varchar(255) NOT NULL,
  PRIMARY KEY ("id")
)
;
-- Criar a tabela resumos
CREATE TABLE "public"."resumos" (
  "id" serial NOT NULL,
  "topicos" varchar(255) NOT NULL,
  "descricao" varchar(255) NOT NULL,
  "criado" timestamptz NOT NULL DEFAULT now(),
  "usuario_id" serial NOT NULL,
  "materia_id" serial NOT NULL,
  PRIMARY KEY ("id", "usuario_id", "materia_id"),
  CONSTRAINT "usuario_id" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios" ("id"),
  CONSTRAINT "materia_id" FOREIGN KEY ("materia_id") REFERENCES "public"."materias" ("id")
)
;
-- Inserir valores na tabela materias
INSERT INTO materias (nome) VALUES
  ('Back-end'),
  ('Front-end'),
  ('Carreira'),
  ('Mobile'),
  ('Design'),
  ('Dados'),
  ('SQL');
-- Listando materias
SELECT * FROM materias;
-- Verificando se existe um usuário com um dado e-mail
SELECT * FROM usuarios WHERE email = 'email@email.com';
-- Criando um novo usuário
INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *;
-- Criando um novo resumo
INSERT INTO resumos (usuario_id, materia_id, topicos, descricao)
VALUES (id_usuario, id_materia, 'topicos_resumo', 'descricao_resumo');
-- Listando resumos de um determinado usuário
SELECT * FROM resumos WHERE usuario_id = id_usuario;
-- Listando resumos filtrados por uma matéria e que correspondem a um determinado usuário
SELECT r.*, u.nome, m.nome AS materia_nome
FROM resumos r
JOIN usuarios u ON r.usuario_id = u.id
JOIN materias m ON r.materia_id = m.id
WHERE r.usuario_id = id_do_usuario AND r.materia_id = id_da_materia;
-- Verificando se um resumo com um determinado id pertence a um determinado usuário
SELECT EXISTS (SELECT 1 FROM resumos WHERE id = id_resumo AND usuario_id = id_usuario);
-- Editando todos os campos de um resumo especificado pelo seu id
UPDATE resumos
SET topicos = novos_topicos, descricao = nova_descricao
WHERE id = id_resumo;
-- Deletando um resumo especificado pelo seu id
DELETE FROM resumos WHERE id = id_resumo;
-- Visualizando a quantidade de resumos gerados em um determinado mês
SELECT COUNT(*)
FROM resumos
WHERE EXTRACT(MONTH FROM criado) = mes_desejado
  AND EXTRACT(YEAR FROM criado) = ano_desejado;
