// Importamos a nossa piscina de conexões com o banco de dados (pool).
import pool from "@/lib/db";

// =======================================================
// 1. FUNÇÃO PUT: Roda quando queremos ATUALIZAR (mudar) os dados de um usuário específico.
// =======================================================
export async function PUT(req, { params }) {
  try {
    // No Next.js, { params } guarda os parâmetros que vêm na URL.
    // Como a pasta chama [id], o params vai conter a id do usuário que queremos alterar.
    // O await serve para esperar o computador ler esses parâmetros com calma.
    const { id } = await params;

    // Lemos a cartinha de dados que o frontend nos mandou com as novas informações.
    const { nome, email, perfil } = await req.json();

    // Se a pessoa deixou de preencher o nome, e-mail ou perfil, a gente barra e devolve status 400.
    if (!nome || !email || !perfil) {
      return Response.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 },
      );
    }

    // Executamos o comando UPDATE para modificar o usuário no banco.
    // Usamos Number(id) porque o ID da URL vem como texto, mas no banco ele é um número de verdade!
    const result = await pool.query(
      `UPDATE usuarios 
       SET nome = $1, email = $2, perfil = $3 
       WHERE id = $4
       RETURNING id, nome, email, perfil`,
      [nome, email, perfil, Number(id)],
    );

    // Se o banco responder que atualizou 0 linhas (rowCount === 0), significa que aquele ID não existe no banco.
    // Então devolvemos status 404 (Não Encontrado).
    if (result.rowCount === 0) {
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    // Se deu certo, devolvemos os dados novos do usuário para o frontend desenhar na tela.
    return Response.json({ ok: true, usuario: result.rows[0] });
  } catch (error) {
    // Se der erro no banco ou no código, o catch captura e avisa.
    console.error("Erro ao atualizar usuário:", error);
    return Response.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}

// =======================================================
// 2. FUNÇÃO DELETE: Roda quando queremos APAGAR (deletar) um usuário específico.
// =======================================================
export async function DELETE(req, { params }) {
  try {
    // Pegamos o ID da URL da mesma forma.
    const { id } = await params;

    // Executamos o comando DELETE no banco de dados para sumir com o usuário da tabela.
    const result = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING id",
      [Number(id)],
    );

    // Se rowCount for 0, significa que tentamos apagar um usuário que já não existia.
    if (result.rowCount === 0) {
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    // Se tudo deu certo, devolvemos uma mensagem alegre dizendo que foi apagado!
    return Response.json({ ok: true, message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return Response.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}