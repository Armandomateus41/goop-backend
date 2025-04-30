import { Router } from "express"
import { Usuario } from "../models/Usuario"
import bcrypt from "bcryptjs"
import { verifyToken } from "../middleware/auth.middleware"

const router = Router()

//  Criar novo administrador
router.post("/usuarios", verifyToken, async (req, res) => {
  try {
    const { nome, email, senha } = req.body

    const existente = await Usuario.findOne({ email })
    if (existente) {
      return res.status(400).json({ message: "E-mail já cadastrado" })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const novo = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      role: "admin",
    })

    return res.status(201).json({
      message: "Administrador criado com sucesso",
      usuario: {
        id: novo._id,
        nome: novo.nome,
        email: novo.email,
        role: novo.role,
        criadoEm: novo.createdAt,
      },
    })
  } catch (err) {
    console.error("Erro ao criar administrador:", err)
    res.status(500).json({ message: "Erro interno ao salvar administrador" })
  }
})

// Listar usuários (todos ou por role)
router.get("/usuarios", verifyToken, async (req, res) => {
  try {
    const { role } = req.query
    const filtro = role ? { role } : {}

    const usuarios = await Usuario.find(filtro).sort({ createdAt: -1 })
    res.status(200).json(usuarios)
  } catch (err) {
    console.error("Erro ao listar usuários:", err)
    res.status(500).json({ message: "Erro ao buscar usuários" })
  }
})

//  Atualizar usuário
router.put("/usuarios/:id", verifyToken, async (req, res) => {
  try {
    const { nome, email, role } = req.body

    const atualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nome, email, role },
      { new: true }
    )

    if (!atualizado) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    res.status(200).json(atualizado)
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err)
    res.status(500).json({ message: "Erro ao atualizar usuário" })
  }
})

//  Deletar usuário
router.delete("/usuarios/:id", verifyToken, async (req, res) => {
  try {
    const excluido = await Usuario.findByIdAndDelete(req.params.id)
    if (!excluido) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    res.status(200).json({ message: "Usuário removido com sucesso" })
  } catch (err) {
    console.error("Erro ao deletar usuário:", err)
    res.status(500).json({ message: "Erro interno ao deletar" })
  }
})
// Atualizar permissões de um usuário
router.patch("/usuarios/:id/permissoes", verifyToken, async (req, res) => {
  try {
    const { permissions } = req.body

    if (!Array.isArray(permissions)) {
      return res.status(400).json({ message: "Formato de permissões inválido" })
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true }
    )

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    res.status(200).json({
      message: "Permissões atualizadas com sucesso",
      usuario,
    })
  } catch (err) {
    console.error("Erro ao atualizar permissões:", err)
    res.status(500).json({ message: "Erro interno ao atualizar permissões" })
  }
})

router.get("/usuarios", verifyToken, async (req, res) => {
  try {
    const usuarioLogado = req.user // <-- Adquirido via verifyToken
    if (!usuarioLogado.permissions?.includes("gerenciar_admins")) {
      return res.status(403).json({ message: "Acesso negado" })
    }

    const usuarios = await Usuario.find().sort({ createdAt: -1 })
    res.status(200).json(usuarios)
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar usuários" })
  }
})




export default router
