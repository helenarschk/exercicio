import express from "express";
import Filme from './models/Filme.js';
import Sala from './models/Sala.js';
const app = express();
const PORT = 3000;

// Configura o EJS como motor de views
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// pasta onde ficam os arquivos .ejs
app.set("views", "./views"); 
//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
  res.render("index");
});

//filmes

app.get("/filmes", async (req, res) => {
  const filme = await Filme.find();
  res.render("filmes/lst", {filme});
});

app.get("/filmes/add", (req, res) => {
    res.render("filmes/add");
});

app.post("/filmes/add", async (req, res) => {
  const {titulo, duracao, classificacao_indicativa, genero, em_cartaz} = req.body;
  await Filme.create({titulo, duracao, classificacao_indicativa, genero, em_cartaz});
  res.render("filmes/addok");
});

app.get('/filmes/del/:id', async (req, res) => {
const filme = await Filme.findByIdAndDelete(req.params.id)
res.redirect("/filmes")
})

app.get('/filmes/edt/:id', async (req, res) => {
const filme = await Filme.findById(req.params.id)
res.render("filmes/edt", {filme})
})

app.post('/filmes/edt/:id', async (req, res) => {
const filme = await Filme.findByIdAndUpdate(req.params.id, req.body)
res.render("filmes/edtok")
})

app.post('/filmes', async (req, res) => {
  const { pesquisar } = req.body;
  const filme = await Filme.find({
    titulo: new RegExp(pesquisar, 'i')
  });
  res.render("filmes/lst", { filme });
})

//salas

app.get("/salas", async (req, res) => {
  const sala = await Sala.find()
  res.render("salas/lst", { sala });
});

app.get('/salas/del/:id', async (req, res) => {
const sala = await Sala.findByIdAndDelete(req.params.id)
res.redirect("/salas")
})

app.get("/salas/add", (req, res) => {
    res.render("salas/add");
});

app.post("/salas/add", async (req, res) => {
  const {numero, capacidade} = req.body;
  await Sala.create({numero, capacidade});
  res.render("salas/addok");
});

app.get('/salas/edt/:id', async (req, res) => {
const sala = await Sala.findById(req.params.id)
res.render("salas/edt", {sala})
})

app.post('/salas/edt/:id', async (req, res) => {
const sala = await Sala.findByIdAndUpdate(req.params.id, req.body)
res.render("salas/edtok")
})

//pesquisar capacidade maior ou igual ao número inserido pelo usuário

app.post('/salas', async (req, res) => {
  const { pesquisar } = req.body;
  const sala = await Sala.find({
    capacidade: Number(pesquisar)
  });
  res.render("salas/lst", { sala });
})

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
