export const bancoDeDados = {
  usuarios: [
    {
      id: 1,
      nome: 'Karol',
      email: 'karol@email.com',
      senha: 123,
    }
  ],
  resumos: [
    {
      id: 1,
      usuario_id: 1,
      materia_id: 3,
      topicos: 'rotas, intermediarios, controladores',
      descricao: 'descricao',
      criado: new Date()
    }
  ],
  materias: [
    {
      id: 1,
      nome: 'Back-end',
    },
    {
      id: 2,
      nome: 'Front-end',
    },
    {
      id: 3,
      nome: 'Carreira',
    },
    {
      id: 4,
      nome: 'Mobile',
    },
    {
      id: 5,
      nome: 'Design',
    },
    {
      id: 6,
      nome: 'Dados',
    },
    {
      id: 7,
      nome: 'SQL',
    },
  ]
}
