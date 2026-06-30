import conexao from "../config/conexao.js";

const FilmeSchema = new conexao.Schema({
  titulo: String,
  duracao: String,
  classificacao_indicativa: Number,
  genero: String,
  em_cartaz: String
});

const Filme = conexao.model("Filme", FilmeSchema);

export default Filme;