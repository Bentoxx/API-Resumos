export const extrairIdDoToken = (tokenValido: string) => {
  const extrairUsuario = tokenValido.split(" ")[1]
  const jwt = require("jsonwebtoken")
  const idUsuario = jwt.verify(extrairUsuario, process.env.SECRET as string)
  const idExtraido = idUsuario.id
  return idExtraido
}