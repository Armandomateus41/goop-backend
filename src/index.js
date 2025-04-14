"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const pedidos_routes_1 = __importDefault(require("./routes/pedidos.routes"));
const database_1 = require("./config/database");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", auth_routes_1.default);
app.use("/api", pedidos_routes_1.default);
(0, database_1.connectToDatabase)().then(() => {
    app.listen(PORT, () => {
        console.log("MongoDB conectado com sucesso");
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
