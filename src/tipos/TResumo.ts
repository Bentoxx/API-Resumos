import TUsuario from "./TUsuario"

type UsuarioId = TUsuario['id']
type MateriaId = TResumo['id']

type TResumo = {
  readonly id: number
  usuario_id: UsuarioId
  material_id: MateriaId
  titulo: string
  topicos: string
  descricao: string
  criado: string
}

export default TResumo