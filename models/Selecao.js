import conexao from "../config/conexao.js";

const SelecaoSchema = new conexao.Schema({
  nome: String,
  cores: String,
  continentes: String,
  titulos: Number
});

const Selecao = conexao.model("Selecao", SelecaoSchema);

export default Selecao;