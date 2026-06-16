import pool from "@/lib/db";
import bcrypt from "bcryptjs"; 
import { gerarToken } from "@/lib/auth"; 
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { email, senha } = await req.json();

    if (!email || !senha) {
      return Response.json({ error: "E-mail e senha são obrigatórios" }, { status: 400 });
    }

    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return Response.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return Response.json({ error: "Senha inválida" }, { status: 401 });
    }

    // Gerando o token com os dados necessários
    const token = await gerarToken({ 
      id: user.id, 
      nome: user.nome, 
      perfil: user.perfil 
    });

    // Gravando o token nos cookies
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24
    });

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(',')[0] : req.socket?.remoteAddress;

    // 🚨 AGORA SIM: Enviando as colunas certas para a sua tabela
    try {
      await pool.query(
        "INSERT INTO log_acesso (usuario_id, usuario_nome, acao, ip) VALUES ($1, $2, $3, $4)",
        [user.id, user.nome, "login", ip]
      );
    } catch (e) {
      // Se der erro aqui, você verá o motivo real no terminal do VS Code
      console.error("Erro interno ao tentar salvar o Log:", e.message);
    }

    // Retorna os dados normalmente para o frontend
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
    console.error("Erro fatal no login:", error);
    return Response.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}