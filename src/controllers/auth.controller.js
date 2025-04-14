"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = login;
exports.me = me;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const mockUser = {
    email: "admin@goop.com",
    password: "123456",
    name: "Admin Goop"
};
//  Login: exportação padrão
function login(req, res) {
    const { email, password } = req.body;
    if (email !== mockUser.email || password !== mockUser.password) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const token = jsonwebtoken_1.default.sign({ email, name: mockUser.name }, env_1.JWT_SECRET, {
        expiresIn: "539432h",
    });
    return res.json({
        token,
        user: {
            name: mockUser.name,
            email: mockUser.email,
        },
    });
}
//  Método adicional: retorna o usuário do token
function me(req, res) {
    return res.json({ user: req.user });
}
