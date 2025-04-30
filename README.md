#  Goop Pedidos – Backend

Backend da aplicação **Goop Pedidos**, desenvolvido com **Node.js**, **Express** e **TypeScript**, utilizando **MongoDB** como banco de dados. Oferece autenticação com **JWT**, segurança com **BcryptJS**, e estrutura modular pronta para produção.

---

##  Tecnologias Utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB** com **Mongoose**
- **JWT** – Autenticação
- **BcryptJS** – Hash de senha
- **Dotenv** – Variáveis de ambiente

---

##  Requisitos

- [Node.js](https://nodejs.org/) versão 22 ou superior
- [MongoDB](https://www.mongodb.com/) local ou Atlas (cloud)
- [npm](https://www.npmjs.com/)

Verifique sua versão do Node.js:

```bash
node -v
```
1. Clone o repositório

git clone https://github.com/Armandomateus41/goop-backend.git
cd goop-backend

2. Inicialize o projeto e crie o arquivo package.json
npm init -y

3. Instale as dependências principais
npm install express mongoose jsonwebtoken bcryptjs dotenv

4. Instale as dependências de desenvolvimento
npm install --save-dev typescript ts-node @types/node @types/express @types/jsonwebtoken @types/bcryptjs

5. Inicialize o TypeScript

npx tsc --init
