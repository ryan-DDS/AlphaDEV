// Importamos a piscina de conexões com o banco de dados (pool).
import pool from "@/lib/db";

// Importamos a máquina trituradora "bcryptjs" para triturar as senhas novas.
import bcrypt from "bcryptjs";

// =======================================================
// 1. FUNÇÃO GET: Roda quando alguém quer LISTAR (pesquisar) os usuários cadastrados.
// =======================================================
export async function GET() {
  try {
    // Mandamos um comando de leitura para o banco: "Por favor, me dê o id, nome, email, perfil e a data de criação de todos os usuários ordenados pelo ID!"
    const result = await pool.query(
      "SELECT id, nome, email, perfil, criado_em FROM usuarios ORDER BY id ASC"
    );
    
    // Devolvemos a listona de linhas (result.rows) que vieram do banco com status 200 (Sucesso!).
    return Response.json(result.rows, { status: 200 });
  } catch (error) {
    // Se der erro ao ler o banco, avisamos no terminal e devolvemos o erro com status 500.
    console.error("Erro no GET do banco:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// =======================================================
// 2. FUNÇÃO POST: Roda quando alguém quer CADASTRAR (criar) um novo usuário.
// =======================================================
export async function POST(req) {
  try {
    // Abrimos a caixinha com os dados enviados pelo frontend.
    const { nome, email, senha, perfil } = await req.json();

    // Se a criança esqueceu de digitar o nome, e-mail ou senha, barramos a entrada com status 400.
    if (!nome || !email || !senha) {
      return Response.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 },
      );
    }

    // Trituramos a senha usando bcrypt.hash. O número 10 define o quão difícil vai ser para um hacker destriturar essa senha.
    // É tipo dar 10 voltas no cadeado secreto!
    const hash = await bcrypt.hash(senha, 10);
    
    // Se não for passado um perfil, o padrão será "aluno".
    const perfilFinal = perfil || "aluno";

    // Executamos o comando INSERT no banco para salvar a nova linha de usuário.
    // O $1, $2, $3 e $4 são espaços reservados (máscaras de segurança) para evitar que alguém envie códigos maldosos para o banco (SQL Injection).
    // RETURNING nos diz para o banco devolver os dados salvos de volta assim que terminar de inserir.
    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, perfil) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, nome, email, perfil, criado_em`,
      [nome, email, hash, perfilFinal],
    );

    // Devolvemos o usuário que acabou de ser criado com o status 201 (Created / Criado com sucesso!).
    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    // Se der ruim (tipo cadastrar um e-mail que já existe), caímos aqui no erro.
    console.error("Erro no cadastro:", error);
    return Response.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}