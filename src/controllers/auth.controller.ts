import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env"

const mockUser = {
  email: "admin@goop.com",
  password: "123456",
  name: "Admin Goop"
}

//  Login: exportação padrão
export default function login(req: Request, res: Response) {
  const { email, password } = req.body

  if (email !== mockUser.email || password !== mockUser.password) {
    return res.status(401).json({ message: "Credenciais inválidas" })
  }

  const token = jwt.sign({ email, name: mockUser.name }, JWT_SECRET, {
    expiresIn: "539432h",
  })

  return res.json({
    token,
    user: {
      name: mockUser.name,
      email: mockUser.email,
    },
  })
}

//  Método adicional: retorna o usuário do token
export function me(req: Request, res: Response) {
  return res.json({ user: req.user })
}