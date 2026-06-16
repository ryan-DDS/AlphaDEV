"use client";
import { useState, useEffect } from "react";

export default function DashboardAdmin({ user }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados do Formulário
  const [idEdicao, setIdEdicao] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("aluno");

  const API_URL = "/api/usuarios";

  // Função de Logout Universal
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (response.ok) {
        const dados = await response.json();
        setUsuarios(Array.isArray(dados) ? dados : []);
      }
    } catch (error) {
      console.error("Erro ao carregar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const totalAlunos = usuarios.filter((u) => u.perfil === "aluno").length;
  const totalProfessores = usuarios.filter((u) => u.perfil === "professor").length;

  const handleSalvarUsuario = async (e) => {
    e.preventDefault();
    try {
      const method = idEdicao ? "PUT" : "POST";
      const url = idEdicao ? `${API_URL}/${idEdicao}` : API_URL;
      const body = idEdicao 
        ? { nome, email, perfil } 
        : { nome, email, senha, perfil };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setIdEdicao(null);
        setNome(""); setEmail(""); setSenha(""); setPerfil("aluno");
        carregarUsuarios();
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleIniciarEdicao = (usuario) => {
    setIdEdicao(usuario.id);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setPerfil(usuario.perfil);
    setSenha("");
  };

  const handleExcluirUsuario = async (id) => {
    if (confirm("Tem certeza que deseja deletar?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        carregarUsuarios();
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      {/* Header com o handleLogout agora definido */}
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-violet-600">Painel Administrativo</h1>
          <p className="text-white/50 text-sm mt-1">Bem-vindo, {user?.nome || "Admin"}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm font-semibold transition-all"
        >
          Sair da Conta
        </button>
      </div>

      {/* Cards de Métricas Reais vindas do Postgres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-gray-800/50 border border-white/5 rounded-xl backdrop-blur-sm">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
            Total de Alunos
          </h3>
          <p className="text-3xl font-bold text-white">
            {loading ? "..." : totalAlunos}
          </p>
        </div>
        <div className="p-6 bg-gray-800/50 border border-white/5 rounded-xl backdrop-blur-sm">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
            Total de Professores
          </h3>
          <p className="text-3xl font-bold text-violet-400">
            {loading ? "..." : totalProfessores}
          </p>
        </div>
        <div className="p-6 bg-gray-800/50 border border-white/5 rounded-xl backdrop-blur-sm">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
            Status do Sistema
          </h3>
          <p className="text-3xl font-bold text-green-400">Online</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORMULÁRIO: Cadastrar / Editar */}
        <div className="bg-gray-800/40 border border-white/5 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-4 text-violet-400">
            {idEdicao ? "Editar Registro" : "Inserir no Banco"}
          </h2>
          <form onSubmit={handleSalvarUsuario} className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase font-semibold">
                Nome (`nome` VARCHAR)
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
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase font-semibold">
                Email (`email` UNIQUE)
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
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase font-semibold">
                Senha (`senha` VARCHAR)
              </label>
              <input
                type="password"
                required={!idEdicao}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm focus:border-violet-500 outline-none"
                placeholder={
                  idEdicao ? "Deixe em branco para manter" : "••••••••"
                }
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase font-semibold">
                Perfil (`perfil` user_role ENUM)
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

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm font-bold transition-colors"
              >
                {idEdicao ? "Atualizar Dados" : "Salvar no Banco"}
              </button>
              {idEdicao && (
                <button
                  type="button"
                  onClick={() => {
                    setIdEdicao(null);
                    setNome("");
                    setEmail("");
                    setPerfil("aluno");
                  }}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* TABELA: Visualizar Tudo */}
        <div className="lg:col-span-2 bg-gray-800/40 border border-white/5 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-white/80">
            Registros em `usuarios`
          </h2>

          {loading ? (
            <p className="text-sm text-white/50 animate-pulse py-4">
              Buscando informações do banco...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wider">
                    <th className="py-3 px-4">ID (SERIAL)</th>
                    <th className="py-3 px-4">Nome</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Perfil (ENUM)</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {/* PROTEÇÃO: Verificação se usuarios existe e é um array antes de mapear */}
                  {Array.isArray(usuarios) && usuarios.length > 0 ? (
                    usuarios.map((u) => (
                      <tr
                        key={u.id}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-4 text-white/50">{u.id}</td>
                        <td className="py-3 px-4 font-medium">{u.nome}</td>
                        <td className="py-3 px-4 text-white/70">{u.email}</td>
                        <td className="py-3 px-4">
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
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleIniciarEdicao(u)}
                            className="text-xs bg-white/5 hover:bg-violet-600/30 border border-white/10 hover:border-violet-500/50 px-2.5 py-1 rounded transition-all"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleExcluirUsuario(u.id)}
                            className="text-xs bg-white/5 hover:bg-red-600/30 border border-white/10 hover:border-red-500/50 px-2.5 py-1 rounded transition-all"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-8 text-white/30"
                      >
                        Nenhum usuário cadastrado no banco.
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