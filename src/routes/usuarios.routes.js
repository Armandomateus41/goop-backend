"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Usuario_1 = require("../models/Usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
//  Criar novo administrador
router.post("/usuarios", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, email, senha } = req.body;
        const existente = yield Usuario_1.Usuario.findOne({ email });
        if (existente) {
            return res.status(400).json({ message: "E-mail já cadastrado" });
        }
        const senhaCriptografada = yield bcryptjs_1.default.hash(senha, 10);
        const novo = yield Usuario_1.Usuario.create({
            nome,
            email,
            senha: senhaCriptografada,
            role: "admin",
        });
        return res.status(201).json({
            message: "Administrador criado com sucesso",
            usuario: {
                id: novo._id,
                nome: novo.nome,
                email: novo.email,
                role: novo.role,
                criadoEm: novo.createdAt,
            },
        });
    }
    catch (err) {
        console.error("Erro ao criar administrador:", err);
        res.status(500).json({ message: "Erro interno ao salvar administrador" });
    }
}));
// Listar usuários (todos ou por role)
router.get("/usuarios", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.query;
        const filtro = role ? { role } : {};
        const usuarios = yield Usuario_1.Usuario.find(filtro).sort({ createdAt: -1 });
        res.status(200).json(usuarios);
    }
    catch (err) {
        console.error("Erro ao listar usuários:", err);
        res.status(500).json({ message: "Erro ao buscar usuários" });
    }
}));
//  Atualizar usuário
router.put("/usuarios/:id", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, email, role } = req.body;
        const atualizado = yield Usuario_1.Usuario.findByIdAndUpdate(req.params.id, { nome, email, role }, { new: true });
        if (!atualizado) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json(atualizado);
    }
    catch (err) {
        console.error("Erro ao atualizar usuário:", err);
        res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
}));
//  Deletar usuário
router.delete("/usuarios/:id", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const excluido = yield Usuario_1.Usuario.findByIdAndDelete(req.params.id);
        if (!excluido) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json({ message: "Usuário removido com sucesso" });
    }
    catch (err) {
        console.error("Erro ao deletar usuário:", err);
        res.status(500).json({ message: "Erro interno ao deletar" });
    }
}));
exports.default = router;
