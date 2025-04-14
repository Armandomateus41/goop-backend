import { Router } from "express"
import { verifyToken } from "../middleware/auth.middleware"
import { Pedido } from "../models/Pedido"

const router = Router()

// Criar pedido
router.post("/pedidos", verifyToken, async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body)
    res.status(201).json(pedido)
  } catch (err) {
    res.status(500).json({ message: "Erro ao salvar pedido" })
  }
})

// Listar pedidos com paginação + filtros
router.get("/pedidos", verifyToken, async (req, res) => {
  try {
    const { cliente, status, page = 1, limit = 10 } = req.query

    const filtro: any = {}

    if (cliente) {
      filtro.cliente = { $regex: new RegExp(String(cliente), "i") }
    }

    const statusFormatado = String(status).toUpperCase()
    if (status && ["PENDENTE", "PROCESSADO"].includes(statusFormatado)) {
      filtro.status = statusFormatado
    }

    const pageNum = Number(page)
    const limitNum = Number(limit)
    const skip = (pageNum - 1) * limitNum

    const [pedidos, total] = await Promise.all([
      Pedido.find(filtro).sort({ criadoEm: -1 }).skip(skip).limit(limitNum),
      Pedido.countDocuments(filtro),
    ])

    return res.status(200).json({
      pedidos,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    })
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar pedidos" })
  }
})

// Buscar por ID
router.get("/pedidos/:id", verifyToken, async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
    if (!pedido) return res.status(404).json({ message: "Pedido não encontrado" })
    res.status(200).json(pedido)
  } catch (err) {
    res.status(500).json({ message: "Erro interno" })
  }
})

// Atualizar pedido
router.put("/pedidos/:id", verifyToken, async (req, res) => {
  try {
    const atualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!atualizado) return res.status(404).json({ message: "Pedido não encontrado" })
    res.status(200).json(atualizado)
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar" })
  }
})

// Atualizar status
router.patch("/pedidos/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body
    const statusFormatado = String(status).toUpperCase()

    if (!["PENDENTE", "PROCESSADO"].includes(statusFormatado))
      return res.status(400).json({ message: "Status inválido" })

    const pedido = await Pedido.findByIdAndUpdate(req.params.id, { status: statusFormatado }, { new: true })
    if (!pedido) return res.status(404).json({ message: "Pedido não encontrado" })

    res.status(200).json(pedido)
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar status" })
  }
})

// Deletar pedido
router.delete("/pedidos/:id", verifyToken, async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id)
    if (!pedido) return res.status(404).json({ message: "Pedido não encontrado" })
    res.status(200).json({ message: "Pedido removido com sucesso" })
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar" })
  }
})

export default router
