import pool from "@/lib/db";
import bcrypt from "bcryptjs";

// =======================================================
// 1. ADICIONE ESTA FUNÇÃO GET EXATAMENTE ASSIM (MAIÚSCULO)
// =======================================================
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, nome, email, perfil, criado_em FROM usuarios ORDER BY id ASC"
    );
    
    // Retorna os dados do banco pro frontend
    return Response.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Erro no GET do banco:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// =======================================================
// 2. SUA FUNÇÃO POST QUE JÁ ESTAVA FUNCIONANDO
// =======================================================
export async function POST(req) {
  try {
    const { nome, email, senha, perfil } = await req.json();

    if (!nome || !email || !senha) {
      return Response.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 },
      );
    }

    const hash = await bcrypt.hash(senha, 10);
    const perfilFinal = perfil || "aluno";

    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, perfil) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, nome, email, perfil, criado_em`,
      [nome, email, hash, perfilFinal],
    );

    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return Response.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}