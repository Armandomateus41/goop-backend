import "express"

declare module "express" {
  export interface Request {
    user?: {
      email: string
      name: string
      iat: number
      exp: number
    }
  }
}
