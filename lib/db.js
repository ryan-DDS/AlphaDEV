// Importa uma caixa de ferramentas chamada "pg" (que sabe conversar com bancos de dados).
// É tipo pegar um brinquedo emprestado que já vem pronto!
import pkg from "pg";

// Aqui a gente abre a caixinha e pega um organizador chamado "Pool".
// Ele ajuda o computador a gerenciar várias conexões com o banco de dados sem dar nó na cabeça.
const { Pool } = pkg;

// Criamos uma "piscina" (pool) cheia de tomadas prontas para ligar no banco de dados.
// Se o computador não achar as configurações salvas, ele usa valores padrão ("postgres", "localhost", etc.).
const pool = new Pool({
  user: process.env.DB_USER || "postgres", // Quem é o usuário dono da conta (o administrador do castelo)
  host: process.env.DB_HOST || "localhost", // Onde o banco de está rodando (localhost = na nossa própria máquina!)
  database: process.env.DB_DATABASE || "alphadev", // O nome da pasta secreta onde salvamos as coisas
  password: process.env.DB_PASSWORD || "postgres", // A senha secreta para entrar (shhh, não conte a ninguém!)
  port: parseInt(process.env.DB_PORT || "5432"), // A porta (tipo a portinha do quarto do banco de dados)
});

// Esta função serve para mandar cartinhas de comandos para o banco de dados.
// 'text' é o texto da cartinha de comando e 'params' são as pecinhas extras que enviamos junto.
export const query = (text, params) => {
  return pool.query(text, params); // O computador vai até a piscina de conexões e faz a pergunta!
};

// Deixa a nossa piscina de conexões disponível para outros arquivos usarem.
export default pool;