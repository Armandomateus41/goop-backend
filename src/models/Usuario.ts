import mongoose, { Schema } from "mongoose"

const UsuarioSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    senha: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "comum"],
      default: "comum",
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

export const Usuario = mongoose.model("Usuario", UsuarioSchema)
