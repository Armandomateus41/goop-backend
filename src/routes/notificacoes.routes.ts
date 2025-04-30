import { Router } from "express"
import { Notificacao } from "../models/Notificacao"
import { verifyToken } from "../middleware/auth.middleware"

const router = Router()

// Listar notificações de um usuário
router.get("/notificacoes", verifyToken, async (req, res) => {
  try {
    const lista = await Notificacao.find({ usuarioDestino: req.user.id })
      .sort({ createdAt: -1 })
    res.status(200).json(lista)
  } catch {
    res.status(500).json({ message: "Erro ao carregar notificações" })
  }
})

// Criar notificação
router.post("/notificacoes", verifyToken, async (req, res) => {
  try {
    const { titulo, mensagem, tipo, usuarioDestino } = req.body

    const nova = await Notificacao.create({
      titulo,
      mensagem,
      tipo,
      usuarioDestino,
      criadoPor: req.user.id,
    })

    res.status(201).json(nova)
  } catch {
    res.status(500).json({ message: "Erro ao criar notificação" })
  }
})

export default router
