import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
}, { timestamps: true })

export const Usuario = mongoose.model("Usuario", usuarioSchema)