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
// Criar novo pedido
router.post("/pedidos", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedidoCriado = yield Pedido_1.Pedido.create(req.body);
        return res.status(201).json(pedidoCriado);
    }
    catch (err) {
        console.error("Erro ao salvar pedido:", err);
        return res.status(500).json({ message: "Erro ao salvar pedido" });
    }
}));
// Listar todos os pedidos com filtro por cliente e status
router.get("/pedidos", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cliente, status } = req.query;
        const filtro = {};
        if (cliente) {
            filtro.cliente = { $regex: new RegExp(cliente, "i") };
        }
        if (status && ["PENDENTE", "PROCESSADO"].includes(status)) {
            filtro.status = status;
        }
        const pedidos = yield Pedido_1.Pedido.find(filtro).sort({ criadoEm: -1 });
        return res.status(200).json(pedidos);
    }
    catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        return res.status(500).json({ message: "Erro ao buscar pedidos" });
    }
}));
// Buscar pedido por ID
router.get("/pedidos/:id", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedido = yield Pedido_1.Pedido.findById(req.params.id);
        if (!pedido)
            return res.status(404).json({ message: "Pedido não encontrado" });
        return res.status(200).json(pedido);
    }
    catch (err) {
        console.error("Erro ao buscar pedido:", err);
        return res.status(500).json({ message: "Erro interno ao buscar pedido" });
    }
}));
// Atualizar apenas o status do pedido
router.patch("/pedidos/:id", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        if (!["PENDENTE", "PROCESSADO"].includes(status)) {
            return res.status(400).json({ message: "Status inválido" });
        }
        const pedido = yield Pedido_1.Pedido.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!pedido)
            return res.status(404).json({ message: "Pedido não encontrado" });
        return res.status(200).json(pedido);
    }
    catch (err) {
        console.error("Erro ao atualizar status:", err);
        return res.status(500).json({ message: "Erro ao atualizar status" });
    }
}));
// Atualizar pedido completo
router.put("/pedidos/:id", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedidoAtualizado = yield Pedido_1.Pedido.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!pedidoAtualizado)
            return res.status(404).json({ message: "Pedido não encontrado" });
        return res.status(200).json(pedidoAtualizado);
    }
    catch (err) {
        console.error("Erro ao atualizar pedido:", err);
        return res.status(500).json({ message: "Erro ao atualizar pedido" });
    }
}));
// Deletar pedido
router.delete("/pedidos/:id", auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedido = yield Pedido_1.Pedido.findByIdAndDelete(req.params.id);
        if (!pedido)
            return res.status(404).json({ message: "Pedido não encontrado" });
        return res.status(200).json({ message: "Pedido deletado com sucesso" });
    }
    catch (err) {
        console.error("Erro ao deletar pedido:", err);
        return res.status(500).json({ message: "Erro ao deletar pedido" });
    }
}));
exports.default = router;
