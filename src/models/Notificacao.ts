import mongoose, { Schema } from "mongoose"

const NotificacaoSchema = new Schema(
  {
    titulo: { type: String, required: true },
    mensagem: { type: String, required: true },
    tipo: { type: String, enum: ["info", "success", "warning", "error"], default: "info" },
    lida: { type: Boolean, default: false },
    usuarioDestino: { type: Schema.Types.ObjectId, ref: "Usuario" },
    criadoPor: { type: Schema.Types.ObjectId, ref: "Usuario" },
  },
  { timestamps: true }
)

export const Notificacao = mongoose.model("Notificacao", NotificacaoSchema)
