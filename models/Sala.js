import conexao from "../config/conexao.js";

const SalaSchema = new conexao.Schema({
  numero: Number,
  capacidade: Number,
});

const Sala = conexao.model("Sala", SalaSchema);

export default Sala;