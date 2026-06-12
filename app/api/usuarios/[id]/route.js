import pool from "@/lib/db";

// Atualizar Usuário
export async function PUT(req, { params }) {
  try {
    // 1. No Next.js, desestruturamos o params direto no argumento da função
    const { id } = await params;

    // 2. Recebe os dados do corpo da requisição (incluindo o perfil que criamos)
    const { nome, email, perfil } = await req.json();

    // Validação básica
    if (!nome || !email || !perfil) {
      return Response.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 },
      );
    }

    // 3. Executa o UPDATE usando as variáveis corretas
    const result = await pool.query(
      `UPDATE usuarios 
       SET nome = $1, email = $2, perfil = $3 
       WHERE id = $4
       RETURNING id, nome, email, perfil`,
      [nome, email, perfil, Number(id)],
    );

    // Se não encontrou o usuário para atualizar
    if (result.rowCount === 0) {
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    // Retorna os dados atualizados para o cliente ver
    return Response.json({ ok: true, usuario: result.rows[0] });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return Response.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}

// Deletar Usuário
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const result = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING id",
      [Number(id)],
    );

    // Se não deletou nenhuma linha, significa que o ID não existia
    if (result.rowCount === 0) {
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    return Response.json({ ok: true, message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return Response.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}
