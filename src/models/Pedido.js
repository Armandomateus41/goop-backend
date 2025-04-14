"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ItemSchema = new mongoose_1.default.Schema({
    nome: { type: String, required: true },
    quantidade: { type: Number, required: true },
    preco: { type: Number, required: true },
});
const PedidoSchema = new mongoose_1.default.Schema({
    cliente: { type: String, required: true },
    itens: [ItemSchema],
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ["PENDENTE", "PROCESSADO"],
        default: "PENDENTE",
    },
    criadoEm: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Pedido = mongoose_1.default.model("Pedido", PedidoSchema);
