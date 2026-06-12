export default function DashboardAdmin({ user }) {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500">
            Painel do Administrador
          </h1>
          <p className="text-white/50 text-sm mt-1">Bem-vindo ao controle central, {user.nome || "Admin"}</p>
        </div>
        <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full">
          Acesso Total
        </span>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-gray-800/50 border border-white/5 rounded-xl backdrop-blur-sm">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Total de Alunos</h3>
          <p className="text-3xl font-bold text-white">1,248</p>
        </div>
        <div className="p-6 bg-gray-800/50 border border-white/5 rounded-xl backdrop-blur-sm">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Total de Professores</h3>
          <p className="text-3xl font-bold text-violet-400">84</p>
        </div>
        <div className="p-6 bg-gray-800/50 border border-white/5 rounded-xl backdrop-blur-sm">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Status do Banco</h3>
          <p className="text-3xl font-bold text-green-400">Online</p>
        </div>
      </div>

      {/* Ações Rápidas de Gerenciamento */}
      <div className="bg-gray-800/40 border border-white/5 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white/80">Ferramentas de Controle</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="p-4 bg-white/5 border border-white/10 rounded-lg text-left hover:bg-violet-600/20 hover:border-violet-500 transition-all duration-300">
            <h4 className="font-bold text-white text-sm">Aprovar Professores</h4>
            <p className="text-xs text-white/50 mt-1">3 cadastros aguardando revisão.</p>
          </button>
          <button className="p-4 bg-white/5 border border-white/10 rounded-lg text-left hover:bg-red-600/20 hover:border-red-500 transition-all duration-300">
            <h4 className="font-bold text-white text-sm">Logs do Sistema</h4>
            <p className="text-xs text-white/50 mt-1">Verificar erros e acessos recentes.</p>
          </button>
        </div>
      </div>
    </div>
  );
}