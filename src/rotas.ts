import { Router} from "express";
import { cadastroUsuario, loginUsuario } from "./Controladores/controladorUsuarios";
import { validacaoCorpoCadastroUsuario, validacaoCorpoLogin } from "./Intermediarios/intermediarioUsuarios";
import { validarToken } from "./Intermediarios/validarToken";
import { criarResumo, deletarResumo, editarReumo, listarResumo } from "./Controladores/controladorResumos";
import { listarMateria } from "./Controladores/controladorMaterias";


const rotas = Router();


rotas.post("/usuarios", validacaoCorpoCadastroUsuario, cadastroUsuario);
rotas.post("/login", validacaoCorpoLogin, loginUsuario);
rotas.use(validarToken);
rotas.get("/materias", listarMateria)
rotas.get("/resumos", listarResumo)
rotas.post("/resumos", criarResumo)
rotas.put("/resumos/:id", editarReumo)
rotas.delete("/resumos/:id", deletarResumo)

export default rotas;
