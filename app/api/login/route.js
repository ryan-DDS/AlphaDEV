// Importamos a nossa piscina de conexões com o banco de dados (pool).
import pool from "@/lib/db";

// Importamos a biblioteca "bcryptjs", que é tipo uma máquina trituradora de senhas.
// Ela ajuda a checar se a senha que o usuário digitou é a mesma que guardamos triturada no banco de dados.
import bcrypt from "bcryptjs"; 

// Importamos a nossa fábrica de crachás (gerarToken) que criamos na pasta lib.
import { gerarToken } from "@/lib/auth"; 

// Importamos o brinquedo "cookies" do Next.js. Ele serve para guardar coisas na gavetinha de memória
// do navegador do usuário, para ele não precisar fazer login toda vez que mudar de página.
import { cookies } from "next/headers";

// Esta é a função que atende quando o frontend bate na portinha "/api/login" usando o método POST (enviar dados).
export async function POST(req) {
  try {
    // Abrimos o envelope da requisição (req.json()) para pegar o e-mail e a senha que o usuário digitou.
    const { email, senha } = await req.json();

    // Se a criança esqueceu de digitar o e-mail ou a senha, a gente responde com um erro e o status 400 (Bad Request / Requisição Feia).
    if (!email || !senha) {
      return Response.json({ error: "E-mail e senha são obrigatórios" }, { status: 400 });
    }

    // Fazemos uma pergunta ao banco de dados: "Tem algum usuário com esse e-mail aí na tabela?"
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    // Pegamos a primeira linha de resposta do banco.
    const user = result.rows[0];

    // Se o banco de dados responder que não achou ninguém, retornamos o status 404 (Not Found / Não Encontrado).
    if (!user) {
      return Response.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Usamos o triturador "bcrypt" para ver se a senha digitada bate com a senha triturada (hash) que está no banco.
    const senhaValida = await bcrypt.compare(senha, user.senha);
    // Se a senha estiver errada, respondemos com erro e o status 401 (Unauthorized / Não Autorizado!).
    if (!senhaValida) {
      return Response.json({ error: "Senha inválida" }, { status: 401 });
    }

    // Se chegou até aqui, o usuário é quem diz ser!
    // Chamamos a nossa máquina de fazer crachás (gerarToken) passando os dados dele.
    const token = await gerarToken({ 
      id: user.id, 
      nome: user.nome, 
      perfil: user.perfil 
    });

    // Abrimos a gavetinha de cookies do navegador do usuário.
    const cookieStore = await cookies();
    // Guardamos o crachá (token) na gaveta de cookies chamada "token".
    // httpOnly: true significa que nenhum hacker curioso consegue ler esse cookie via script.
    // secure: true (se estiver rodando na internet real/produção) significa que só viaja com segurança HTTPS.
    // maxAge define que o crachá vai sumir sozinho depois de 1 dia (60 seg * 60 min * 24 horas).
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24
    });

    // Descobrimos o IP (o número do endereço da internet) do computador da criança.
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(',')[0] : req.socket?.remoteAddress;

    // Tentamos salvar um diário de visitas (log_acesso) no banco de dados para segurança.
    try {
      await pool.query(
        "INSERT INTO log_acesso (usuario_id, usuario_nome, acao, ip) VALUES ($1, $2, $3, $4)",
        [user.id, user.nome, "login", ip]
      );
    } catch (e) {
      // Se der algum erro ao salvar no diário, a gente avisa no terminal do programador, mas não trava o login do usuário.
      console.error("Erro interno ao tentar salvar o Log:", e.message);
    }

    // Retorna os dados do usuário e o token para o frontend pular de alegria.
    return Response.json({ 
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil
      }
    });

  } catch (error) {
    // Se acontecer algum erro catastrófico que quebre o código, o catch segura e responde com status 500 (Erro no Servidor).
    console.error("Erro fatal no login:", error);
    return Response.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}