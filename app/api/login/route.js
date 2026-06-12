import pool from "@/lib/db";
import bcrypt from "bcryptjs"; 
import { gerarToken } from "@/lib/auth"; 
import { cookies } from "next/headers"; // 1. Adicionado: Import do gerenciador de cookies do Next

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
      nome: user.nome, // Adicionei o nome aqui para o dashboard conseguir exibir depois!
      perfil: user.perfil 
    });

    // 2. O SEGREDO: Gravando o token de forma segura nos cookies do navegador
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true, // Segurança contra invasões via scripts front-end
      secure: process.env.NODE_ENV === "production", // Só roda em HTTPS quando estiver online
      sameSite: "strict",
      path: "/", // Torna o cookie visível para todas as rotas do projeto (ex: /dashboard)
      maxAge: 60 * 60 * 24 // Duração de 1 dia ativo no navegador
    });

    // 3. Retorna os dados normalmente para o frontend
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
    console.error("Erro no login:", error);
    return Response.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}