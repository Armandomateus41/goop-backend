import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env"

interface DecodedToken {
  email: string
  name: string
  iat: number
  exp: number
}

// Middleware que protege rotas
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken
    req.user = decoded // @types/express precisa saber disso
    next()
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" })
  }
}
