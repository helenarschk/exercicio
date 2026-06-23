import express from "express";
import Selecao from './models/Selecao.js';
import Jogador from './models/Jogador.js';
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

//seleção

app.get("/selecao", async (req, res) => {
  const selecao = await Selecao.find();
  res.render("selecao/lst", {selecao});
});

app.get("/selecao/add", (req, res) => {
    res.render("selecao/add");
});

app.post("/selecao/add", async (req, res) => {
  const {nome, cores, continentes, titulos} = req.body;
  await Selecao.create({nome, cores, continentes, titulos});
  res.render("selecao/addok");
});

app.get('/selecao/del/:id', async (req, res) => {
const selecao = await Selecao.findByIdAndDelete(req.params.id)
res.redirect("/selecao")
})

app.get('/selecao/edt/:id', async (req, res) => {
const selecao = await Selecao.findById(req.params.id)
res.render("selecao/edt", {selecao})
})

app.post('/selecao/edt/:id', async (req, res) => {
const selecao = await Selecao.findByIdAndUpdate(req.params.id, req.body)
res.render("selecao/edtok")
})

app.post('/selecao', async (req, res) => {
  const { pesquisar } = req.body;
  const selecao = await Selecao.find({
    titulos: {$gt:pesquisar}
  });
  res.render("selecao/lst", { selecao });
})

//jogador

app.get("/jogador", async (req, res) => {
  const jogadores = await Jogador.find()
  res.render("jogador/lst", { jogadores });
});

app.get('/jogador/del/:id', async (req, res) => {
const jogador = await Jogador.findByIdAndDelete(req.params.id)
res.redirect("/jogador")
})

app.get("/jogador/add", (req, res) => {
    res.render("jogador/add");
});

app.post("/jogador/add", async (req, res) => {
  const {nome, numero, selecao, gols, assistencias} = req.body;
  await Jogador.create({nome, numero, selecao, gols, assistencias});
  res.render("jogador/addok");
});

app.get('/jogador/edt/:id', async (req, res) => {
const jogador = await Jogador.findById(req.params.id)
res.render("jogador/edt", {jogador})
})

app.post('/jogador/edt/:id', async (req, res) => {
const jogador = await Jogador.findByIdAndUpdate(req.params.id, req.body)
res.render("jogador/edtok")
})

app.post('/jogador', async (req, res) => {
  const { pesquisar } = req.body;
  const jogadores = await Jogador.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("jogador/lst", { jogadores });
})

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
