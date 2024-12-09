const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Configuração do JWT
const SECRET_KEY = "seu-segredo-seguro";

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose.connect("mongodb://localhost:27017/sistemaNoticias", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Modelos de Usuários e Notícias
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const NewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
});
const User = mongoose.model("User", UserSchema);
const News = mongoose.model("News", NewsSchema);

// Função para autenticação de tokens
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Acesso não autorizado" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = user;
    next();
  });
};


app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.json({ message: "Usuário registrado com sucesso!" });
});

// Rota de login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Senha inválida" });

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});


app.get("/news", verifyToken, async (req, res) => {
  const news = await News.find();
  res.json(news);
});

app.post("/news", verifyToken, async (req, res) => {
  const { title, description, imageUrl } = req.body;
  const news = new News({ title, description, imageUrl });
  await news.save();
  res.json({ message: "Notícia adicionada com sucesso!" });
});

app.put("/news/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl } = req.body;
  await News.findByIdAndUpdate(id, { title, description, imageUrl });
  res.json({ message: "Notícia atualizada com sucesso!" });
});

app.delete("/news/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  await News.findByIdAndDelete(id);
  res.json({ message: "Notícia excluída com sucesso!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
