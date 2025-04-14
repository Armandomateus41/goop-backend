import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true },
  preco: { type: Number, required: true },
})

const PedidoSchema = new mongoose.Schema(
  {
    cliente: { type: String, required: true },
    itens: [ItemSchema],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDENTE", "PROCESSADO"],
      default: "PENDENTE",
    },
    criadoEm: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export const Pedido = mongoose.model("Pedido", PedidoSchema)
