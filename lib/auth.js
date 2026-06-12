import jwt from "jsonwebtoken";

// O segredo deve vir de uma variável de ambiente, nunca fique exposto no código.
// Se não encontrar no .env, usamos um fallback (apenas para dev)
const SECRET = process.env.JWT_SECRET || "seu-segredo-super-seguro-aqui";

export function gerarToken(user) {
  // CRÍTICO: Criamos um payload limpo. 
  // Nunca coloque a senha ou objetos inteiros do banco de dados aqui.
  const payload = {
    id: user.id,
    perfil: user.perfil,
  };

  return jwt.sign(payload, SECRET, { expiresIn: "14d" });
}

export function verificarToken(token) {
  try {
    // Retorna o objeto { id, perfil, iat, exp } se o token for válido
    return jwt.verify(token, SECRET);
  } catch (error) {
    // Se o token estiver expirado ou for inválido, retorna null
    return null;
  }
}