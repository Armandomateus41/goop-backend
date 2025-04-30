import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

app.get('/', (req, res) => {
  res.send('API Goop funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
