export type TPayload = {
  id: string
  nome: string
  email: string
  iat?: number
  exp?: number
}
declare global {
  namespace Express {
    interface Request {
      user: TPayload
    }
  }
}