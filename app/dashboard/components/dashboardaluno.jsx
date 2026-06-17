// "use client" avisa ao computador que esse arquivo roda no navegador da criança (onde aparecem botões, tabelas, etc.)
// e não no servidor escondido lá longe.
"use client";

// Importamos useState (para caixas de memórias) e useEffect (para disparar ações quando a página se abre).
import { useState, useEffect } from "react";

// Esta é a fábrica que cria a tela de Aluno.
// Ela recebe os dados do usuário logado (user) como presente.
export default function DashboardAluno({ user }) {
  // Caixinha para guardar a lista completa de usuários cadastrados no banco.
  const [usuarios, setUsuarios] = useState([]);

  // Caixinha de liga/desliga para mostrar um texto de "Carregando..." enquanto o computador busca os dados na internet.
  const [loading, setLoading] = useState(true);

  // Caixinhas para a busca e filtros da tabela de usuários:
  const [pesquisa, setPesquisa] = useState("");
  const [filtroPerfil, setFiltroPerfil] = useState("todos");

  // A portinha da API com a qual vamos conversar.
  const API_URL = "/api/usuarios";

  // Função para deslogar do site.
  const handleLogout = () => {
    // Para deslogar, nós criamos um cookie com o mesmo nome ("token"), mas definimos que ele venceu no ano de 1970.
    // O navegador pensa: "Nossa, esse crachá está vencido faz anos!" e joga ele fora na hora.
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Teletransportamos o usuário deslogado para a tela de login.
    window.location.href = "/login";
  };

  // Função que busca a lista de usuários no banco de dados.
  const carregarUsuarios = async () => {
    try {
      setLoading(true); // Liga o sinal de "estou carregando..."

      // Manda o pombo correio (fetch) até a portinha do banco pedir a lista.
      const response = await fetch(API_URL);

      // Se a portinha responder que deu certo (ok):
      if (response.ok) {
        // Lemos a lista de usuários em formato JSON.
        const dados = await response.json();
        // Salvamos na caixinha de memórias 'usuarios' (se não vier lista, salvamos uma lista vazia []).
        setUsuarios(Array.isArray(dados) ? dados : []);
      }
    } catch (error) {
      // Se der algum erro, avisamos o programador no terminal.
      console.error("Erro ao carregar:", error);
    } finally {
      setLoading(false); // Desliga o sinal de "estou carregando..."
    }
  };

  // O useEffect roda a função carregarUsuarios assim que a tela abre, para a listona já aparecer de cara!
  useEffect(() => {
    carregarUsuarios();
  }, []); // A lista de dependências vazia [] significa: "só roda uma vez quando o brinquedo ligar".

  // Filtramos e contamos quantos usuários são "aluno".
  const totalAlunos = usuarios.filter((u) => u.perfil === "aluno").length;
  // Filtramos e contamos quantos são "professor".
  const totalProfessores = usuarios.filter((u) => u.perfil === "professor").length;
  const totalAdmins = usuarios.filter((u) => u.perfil === "admin").length;

  // Filtramos a lista de usuários exibida na tabela com base na pesquisa por texto e no filtro de perfil.
  const usuariosFiltrados = usuarios.filter((u) => {
    const nome = u.nome ? u.nome.toLowerCase() : "";
    const email = u.email ? u.email.toLowerCase() : "";
    const id = u.id ? String(u.id) : "";
    const termo = pesquisa.toLowerCase();
    
    const matchesSearch = nome.includes(termo) || email.includes(termo) || id.includes(termo);
    const matchesPerfil = filtroPerfil === "todos" || u.perfil === filtroPerfil;
    return matchesSearch && matchesPerfil;
  });

  // Obtemos os últimos 3 cadastrados no sistema.
  const ultimosUsuarios = [...usuarios]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    // Caixa escura principal que envelopa tudo.
    <div className="p-8 bg-gray-900 min-h-screen text-white">

      {/* Menu do Topo (Header) */}
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-violet-600">Painel do Aluno</h1>
          <p className="text-white/50 text-sm mt-1">Bem-vindo de volta, Aluno</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 cursor-pointer bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm font-semibold transition-all"
        >
          Sair da Conta
        </button>
      </div>

      {/* Cartões de Estatísticas com números reais do banco de dados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Card de Alunos */}
        <div className="p-6 bg-gray-800/50 border border-white/5 rounded-xl backdrop-blur-sm">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
            Total de Alunos
          </h3>
          <p className="text-3xl font-bold text-white">
            {/* Se estiver buscando dados, mostra bolinhas "...". Se terminou, mostra o número! */}
            {loading ? "..." : totalAlunos}
          </p>
        </div>

        {/* Card de Professores */}
        <div className="p-6 bg-gray-800/50 border border-white/5 rounded-xl backdrop-blur-sm">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
            Total de Professores
          </h3>
          <p className="text-3xl font-bold text-violet-400">
            {loading ? "..." : totalProfessores}
          </p>
        </div>

        {/* Card de Admins */}
        <div className="p-6 bg-gray-800/50 border border-white/5 rounded-xl backdrop-blur-sm">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
            Total de Admins
          </h3>
          <p className="text-3xl font-bold text-red-400">
            {loading ? "..." : totalAdmins}
          </p>
        </div>
      </div>

      {/* Seção de Informações Adicionais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Card: Últimos Cadastros */}
        <div className="p-6 bg-gray-800/40 border border-white/5 rounded-xl backdrop-blur-sm flex flex-col h-[240px]">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">
            Últimos Cadastros
          </h3>
          {loading ? (
            <p className="text-sm text-white/40 animate-pulse">Carregando...</p>
          ) : ultimosUsuarios.length > 0 ? (
            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
              {ultimosUsuarios.map((u) => (
                <div key={u.id} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold text-xs uppercase">
                      {u.nome ? u.nome.charAt(0) : "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate text-white">{u.nome}</p>
                      <p className="text-[11px] text-white/40 truncate">{u.email}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    u.perfil === "admin"
                      ? "bg-red-500/20 text-red-400"
                      : u.perfil === "professor"
                        ? "bg-violet-500/20 text-violet-400"
                        : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {u.perfil}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/30">Nenhum cadastro recente.</p>
          )}
        </div>

        {/* Card: Status da Plataforma */}
        <div className="p-6 bg-gray-800/40 border border-white/5 rounded-xl backdrop-blur-sm flex flex-col h-[240px]">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">
            Status da Plataforma
          </h3>
          <div className="space-y-3.5 text-sm flex-1 justify-center flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-white/60">Banco de Dados</span>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                <span className="font-semibold text-green-400 text-xs">Conectado</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60">Ping da API</span>
              <span className="font-mono text-xs text-white bg-white/5 px-2 py-1 rounded">12ms</span>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">Uso do Servidor</span>
                <span className="font-semibold text-violet-400">14%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: "14%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card: Informações & Diretrizes */}
        <div className="p-6 bg-gray-800/40 border border-white/5 rounded-xl backdrop-blur-sm flex flex-col h-[240px]">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">
            Diretrizes do Aluno
          </h3>
          <div className="text-xs text-white/70 space-y-3 overflow-y-auto flex-1 pr-1">
            <p className="border-l-2 border-blue-500/50 pl-2 py-0.5">
              <strong className="text-blue-400 block mb-0.5">Espaço Acadêmico</strong>
              Você tem acesso de leitura para ver a listagem de todos os usuários da plataforma.
            </p>
            <p className="border-l-2 border-violet-500/50 pl-2 py-0.5">
              <strong className="text-violet-400 block mb-0.5">Busca e Filtros</strong>
              Use a barra de pesquisa acima da tabela para filtrar rapidamente os contatos por Nome, E-mail ou ID.
            </p>
          </div>
        </div>

      </div>

      {/* A TABELA DE VISUALIZAÇÃO DOS USUÁRIOS (Sem formulário de edição/cadastro e sem coluna de ações, pois aluno apenas visualiza!) */}
      <div className="w-full bg-gray-800/40 border border-white/5 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-white/80">
            Registros de Usuários
          </h2>
          
          {/* Controles de Busca e Filtro */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Input de Pesquisa */}
            <div className="relative flex-1 sm:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/40">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="text"
                placeholder="nome, email ou ID"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg text-sm placeholder-white/40 focus:border-violet-500 focus:bg-white/10 outline-none transition-all"
              />
              {pesquisa && (
                <button
                  onClick={() => setPesquisa("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/40 hover:text-white/80 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
            
            {/* Filtro de Perfil */}
            <select
              value={filtroPerfil}
              onChange={(e) => setFiltroPerfil(e.target.value)}
              className="bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 focus:border-violet-500 outline-none cursor-pointer transition-all"
            >
              <option value="todos">Todos os Perfis</option>
              <option value="aluno">aluno</option>
              <option value="professor">professor</option>
              <option value="admin">admin</option>
            </select>
          </div>
        </div>

        {/* Se estiver carregando, mostra texto piscando animado (animate-pulse) */}
        {loading ? (
          <p className="text-sm text-white/50 animate-pulse py-4">
            Buscando informações do banco...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wider">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Nome</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Perfil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {/* Proteção para garantir que a lista de usuários é válida antes de mapear (.map) */}
                {Array.isArray(usuariosFiltrados) && usuariosFiltrados.length > 0 ? (
                  usuariosFiltrados.map((u) => (
                    // Cada linha (tr) precisa ter uma chave única (key) que ajuda o React a organizar a tela
                    <tr
                      key={u.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4 text-white/50">{u.id}</td>
                      <td className="py-3 px-4 font-medium">{u.nome}</td>
                      <td className="py-3 px-4 text-white/70">{u.email}</td>
                      <td className="py-3 px-4">
                        {/* Cracházinho colorido de acordo com o perfil */}
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${u.perfil === "admin"
                              ? "bg-red-500/20 text-red-400"
                              : u.perfil === "professor"
                                ? "bg-violet-500/20 text-violet-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                        >
                          {u.perfil}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Se a tabela estiver vazia ou nenhum resultado corresponder aos filtros:
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-12 text-white/30"
                    >
                      {usuarios.length === 0 ? (
                        "Nenhum usuário cadastrado no banco."
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span>Nenhum usuário corresponde aos filtros aplicados.</span>
                          <button
                            type="button"
                            onClick={() => {
                              setPesquisa("");
                              setFiltroPerfil("todos");
                            }}
                            className="text-xs text-violet-400 hover:text-violet-300 underline cursor-pointer"
                          >
                            Limpar filtros
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}