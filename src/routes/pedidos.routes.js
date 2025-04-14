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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const Pedido_1 = require("../models/Pedido");
const router = (0, express_1.Router)();
// Criar pedido
router.post("/pedidos", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedido = yield Pedido_1.Pedido.create(req.body);
        res.status(201).json(pedido);
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao salvar pedido" });
    }
}));
// Listar pedidos com paginação + filtros
router.get("/pedidos", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cliente, status, page = 1, limit = 10 } = req.query;
        const filtro = {};
        if (cliente) {
            filtro.cliente = { $regex: new RegExp(String(cliente), "i") };
        }
        const statusFormatado = String(status).toUpperCase();
        if (status && ["PENDENTE", "PROCESSADO"].includes(statusFormatado)) {
            filtro.status = statusFormatado;
        }
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;
        const [pedidos, total] = yield Promise.all([
            Pedido_1.Pedido.find(filtro).sort({ criadoEm: -1 }).skip(skip).limit(limitNum),
            Pedido_1.Pedido.countDocuments(filtro),
        ]);
        return res.status(200).json({
            pedidos,
            total,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
        });
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao buscar pedidos" });
    }
}));
// Buscar por ID
router.get("/pedidos/:id", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedido = yield Pedido_1.Pedido.findById(req.params.id);
        if (!pedido)
            return res.status(404).json({ message: "Pedido não encontrado" });
        res.status(200).json(pedido);
    }
    catch (err) {
        res.status(500).json({ message: "Erro interno" });
    }
}));
// Atualizar pedido
router.put("/pedidos/:id", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const atualizado = yield Pedido_1.Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!atualizado)
            return res.status(404).json({ message: "Pedido não encontrado" });
        res.status(200).json(atualizado);
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao atualizar" });
    }
}));
// Atualizar status
router.patch("/pedidos/:id", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const statusFormatado = String(status).toUpperCase();
        if (!["PENDENTE", "PROCESSADO"].includes(statusFormatado))
            return res.status(400).json({ message: "Status inválido" });
        const pedido = yield Pedido_1.Pedido.findByIdAndUpdate(req.params.id, { status: statusFormatado }, { new: true });
        if (!pedido)
            return res.status(404).json({ message: "Pedido não encontrado" });
        res.status(200).json(pedido);
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao atualizar status" });
    }
}));
// Deletar pedido
router.delete("/pedidos/:id", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedido = yield Pedido_1.Pedido.findByIdAndDelete(req.params.id);
        if (!pedido)
            return res.status(404).json({ message: "Pedido não encontrado" });
        res.status(200).json({ message: "Pedido removido com sucesso" });
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao deletar" });
    }
}));
exports.default = router;
