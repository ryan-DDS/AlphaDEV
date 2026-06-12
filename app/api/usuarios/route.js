import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    // 1. Pegamos o perfil vindo do seu formulário (aluno, professor ou admin)
    const { nome, email, senha, perfil } = await req.json();

    // 2. Validação: Removemos o "!perfil" daqui para evitar erros caso venha vazio por algum motivo
    if (!nome || !email || !senha) {
      return Response.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 },
      );
    }

    const hash = await bcrypt.hash(senha, 10);

    // 3. O SEGREDO: Se 'perfil' existir (como 'admin'), ele salva. Se não, vira 'aluno'.
    const perfilFinal = perfil || "aluno";

    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, perfil) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, nome, email, perfil, criado_em`,
      [nome, email, hash, perfilFinal], // <-- Passando a variável correta aqui
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