import express from "express"
import authRoutes from "./routes/auth.routes"
import pedidoRoutes from "./routes/pedidos.routes"
import { connectToDatabase } from "./config/database"
import cors from "cors"
import dotenv from "dotenv"
import usuarioRoutes from "./routes/usuarios.routes"
import notificacoesRoutes from "./routes/notificacoes.routes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/api", authRoutes)
app.use("/api", pedidoRoutes)
app.use("/api", usuarioRoutes)
app.use("/api", notificacoesRoutes)

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log("MongoDB conectado com sucesso")
    console.log(`Servidor rodando na porta ${PORT}`)
  })
})
