// Importamos a biblioteca "jsonwebtoken" (abreviada como jwt).
// Ela serve para criar "crachás mágicos" que provam quem o usuário é.
import jwt from "jsonwebtoken";

// O segredo é uma palavra-chave ultra-secreta que só o nosso servidor conhece.
// Se não acharmos essa palavra-chave no arquivo de configurações secreta (.env),
// usamos essa frase padrão abaixo para brincar no nosso computador.
const SECRET = process.env.JWT_SECRET || "seu-segredo-super-seguro-aqui";

// Esta função serve para fabricar um crachá de identificação para o usuário.
export function gerarToken(user) {
  // Criamos uma fichinha (payload) com os dados básicos do usuário.
  // Colocamos só o ID e o cargo (perfil, tipo 'aluno' ou 'professor').
  // AVISO IMPORTANTE: Nunca coloque a senha aqui dentro! Senão qualquer um pode ver.
  const payload = {
    id: user.id,
    perfil: user.perfil,
  };

  // Aqui a gente "assina" (sign) o crachá usando a nossa frase secreta (SECRET)
  // e definimos que o crachá vai valer por 14 dias (expiresIn: "14d").
  // Depois desse tempo, o crachá perde a validade e o usuário tem que fazer login de novo.
  return jwt.sign(payload, SECRET, { expiresIn: "14d" });
}

// Esta função serve para verificar se o crachá que o usuário trouxe é de verdade ou falsificado.
export function verificarToken(token) {
  try {
    // O guarda tenta ler e decifrar o crachá usando a frase secreta.
    // Se der tudo certo, ele devolve os dados que estavam salvos dentro do crachá.
    return jwt.verify(token, SECRET);
  } catch (error) {
    // Se o crachá estiver vencido ou se alguém tentou falsificar a assinatura,
    // o computador vai dar um erro! O "catch" pega o susto desse erro
    // e simplesmente devolve "null" (que significa 'nada' ou 'crachá inválido!').
    return null;
  }
}