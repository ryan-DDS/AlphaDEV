// "use client" avisa que esse código roda no navegador (tela com botões e interações do usuário).
"use client";

// Importamos useState (para caixas de memórias) e useEffect (para disparar ações quando a página se abre).
import { useState, useEffect } from "react";

// Esta é a fábrica que cria a tela de Administrador (o chefe supremo do parquinho!).
// Ela recebe os dados do usuário logado (user) como presente.
export default function DashboardAdmin({ user }) {
  // Caixinha para guardar a lista completa de usuários cadastrados no banco.
  const [usuarios, setUsuarios] = useState([]);
  
  // Caixinha de liga/desliga para mostrar um texto de "Carregando..." enquanto o computador busca os dados na internet.
  const [loading, setLoading] = useState(true);
  
  // ==========================================
  // CAIXINHAS DE MEMÓRIA PARA O FORMULÁRIO:
  // ==========================================
  
  // Se estivermos editando um usuário existente, guardamos o ID dele aqui. Se for nulo (null), significa que estamos criando um usuário novinho!
  const [idEdicao, setIdEdicao] = useState(null);
  // Caixinhas para guardar o que a pessoa está digitando para o nome, e-mail, senha e tipo de conta (perfil).
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("aluno");

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
  // Filtramos e contamos quantos são "admin".
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

  // Função que roda quando clicamos em Salvar/Atualizar no formulário.
  const handleSalvarUsuario = async (e) => {
    // Impede a tela de piscar e apagar tudo.
    e.preventDefault();
    try {
      // Se tivermos um 'idEdicao', estamos alterando um registro (PUT). Senão, estamos criando um novo (POST).
      const method = idEdicao ? "PUT" : "POST";
      // Se for edição, mandamos para /api/usuarios/ID. Se for criação, mandamos para /api/usuarios.
      const url = idEdicao ? `${API_URL}/${idEdicao}` : API_URL;
      
      // Criamos o pacotinho de dados (body) que vai ser enviado.
      // Se for edição, não precisamos reenviar a senha se não quisermos alterar.
      const body = idEdicao 
        ? { nome, email, perfil } 
        : { nome, email, senha, perfil };

      // Mandamos o pombo correio com o método correto e o corpo em formato JSON.
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Se deu tudo certo:
      if (response.ok) {
        // Limpamos todas as caixinhas de memória do formulário para ficar em branco de novo.
        setIdEdicao(null);
        setNome(""); setEmail(""); setSenha(""); setPerfil("aluno");
        // Recarregamos a lista de usuários para mostrar a novidade na tabela!
        carregarUsuarios();
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  // Esta função pega os dados do usuário que clicamos em "Editar" e coloca nas caixinhas de texto do formulário.
  const handleIniciarEdicao = (usuario) => {
    setIdEdicao(usuario.id);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setPerfil(usuario.perfil);
    setSenha(""); // Deixa a senha em branco (só digita se quiser alterar)
  };

  // Esta função deleta um usuário quando clicamos no botão vermelho "Excluir".
  const handleExcluirUsuario = async (id) => {
    // Mostra um aviso na tela perguntando se a criança tem certeza absoluta.
    if (confirm("Tem certeza que deseja deletar?")) {
      try {
        // Manda o pombo correio avisando para a API deletar aquele ID específico.
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        // Recarrega a tabela de usuários.
        carregarUsuarios();
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  return (
    // Caixa escura principal que envelopa tudo.
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      
      {/* Menu do Topo (Header) */}
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-violet-600">Painel Administrativo</h1>
          <p className="text-white/50 text-sm mt-1">Bem-vindo, Admin</p>
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
            Diretrizes do Admin
          </h3>
          <div className="text-xs text-white/70 space-y-3 overflow-y-auto flex-1 pr-1">
            <p className="border-l-2 border-red-500/50 pl-2 py-0.5">
              <strong className="text-red-400 block mb-0.5">Segurança Primeiro</strong>
              Mantenha as senhas fortes para novos perfis e nunca compartilhe contas de administrador.
            </p>
            <p className="border-l-2 border-violet-500/50 pl-2 py-0.5">
              <strong className="text-violet-400 block mb-0.5">Gestão de Perfis</strong>
              Professores só podem cadastrar alunos. Apenas você, administrador, pode criar perfis de professor e admin.
            </p>
          </div>
        </div>

      </div>

      {/* Conteúdo de duas partes: Formulário de preenchimento e Tabela com os usuários cadastrados */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PARTE 1: O FORMULÁRIO DE CADASTRAR OU EDITAR */}
        <div className="bg-gray-800/40 border border-white/5 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-4 text-violet-400">
            {/* Se idEdicao for verdadeiro, o título muda para "Editar Registro", senão fica "Inserir no Banco" */}
            {idEdicao ? "Editar Registro" : "Inserir no Banco"}
          </h2>
          <form onSubmit={handleSalvarUsuario} className="space-y-4">
            
            {/* Input de Nome */}
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase font-semibold">
                Nome
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm focus:border-violet-500 outline-none"
                placeholder="Ex: Nome do Usuário"
              />
            </div>

            {/* Input de E-mail */}
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase font-semibold">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm focus:border-violet-500 outline-none"
                placeholder="email@exemplo.com"
              />
            </div>

            {/* Input de Senha */}
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase font-semibold">
                Senha
              </label>
              <input
                type="password"
                // A senha só é obrigatória se for um usuário novo! Na edição podemos deixar em branco.
                required={!idEdicao}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm focus:border-violet-500 outline-none"
                placeholder={
                  idEdicao ? "Deixe em branco para manter" : "••••••••"
                }
              />
            </div>

            {/* Select para escolher o Cargo (Perfil) */}
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase font-semibold">
                Perfil
              </label>
              <select
                value={perfil}
                onChange={(e) => setPerfil(e.target.value)}
                className="w-full bg-gray-800 border border-white/10 rounded-lg p-2.5 text-sm focus:border-violet-500 outline-none text-white"
              >
                <option value="aluno">aluno</option>
                <option value="professor">professor</option>
                <option value="admin">admin</option>
              </select>
            </div>

            {/* Botões do Formulário */}
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2 cursor-pointer bg-violet-600 hover:bg-violet-700 rounded-lg text-sm font-bold transition-colors"
              >
                {idEdicao ? "Atualizar Dados" : "Salvar no Banco"}
              </button>
              {/* Se estiver editando, mostra um botão extra para cancelar a edição */}
              {idEdicao && (
                <button
                  type="button"
                  onClick={() => {
                    setIdEdicao(null);
                    setNome("");
                    setEmail("");
                    setPerfil("aluno");
                  }}
                  className="px-3 py-2 cursor-pointer bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* PARTE 2: A TABELA DE VISUALIZAÇÃO DOS USUÁRIOS */}
        <div className="lg:col-span-2 bg-gray-800/40 border border-white/5 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-white/80">
              Registros
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
                  placeholder="Nome, email ou ID"
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
                    <th className="py-3 px-4 text-right">Ações</th>
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
                            className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                              u.perfil === "admin"
                                ? "bg-red-500/20 text-red-400"
                                : u.perfil === "professor"
                                  ? "bg-violet-500/20 text-violet-400"
                                  : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {u.perfil}
                          </span>
                        </td>
                        {/* Botões de Ação para cada Usuário da linha */}
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleIniciarEdicao(u)}
                            className="text-xs cursor-pointer bg-white/5 hover:bg-violet-600/30 border border-white/10 hover:border-violet-500/50 px-2.5 py-1 rounded transition-all"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleExcluirUsuario(u.id)}
                            className="text-xs cursor-pointer bg-white/5 hover:bg-red-600/30 border border-white/10 hover:border-red-500/50 px-2.5 py-1 rounded transition-all"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Se a tabela estiver vazia ou nenhum resultado corresponder aos filtros:
                    <tr>
                      <td
                        colSpan="5"
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
    </div>
  );
}