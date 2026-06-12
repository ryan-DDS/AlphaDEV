import pkg from "pg";
const { Pool } = pkg;

// Configuração do Pool utilizando variáveis de ambiente com fallbacks para o seu ambiente local
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "alphadev",
  password: process.env.DB_PASSWORD || "postgres",
  port: parseInt(process.env.DB_PORT || "5432"),
});

// Helper para executar as queries nas suas rotas de API
export const query = (text, params) => {
  return pool.query(text, params);
};

export default pool;