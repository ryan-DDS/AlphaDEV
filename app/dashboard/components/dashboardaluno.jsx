export default function DashboardAluno({ user }) {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Painel do Aluno</h1>
      <p className="text-gray-400 mb-6">Bem-vindo de volta, {user.nome}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-800 rounded-lg border border-purple-500/20">
          <h2 className="text-xl font-semibold mb-2">Minhas Turmas</h2>
          <p className="text-gray-400">Você está matriculado em 3 disciplinas.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg border border-purple-500/20">
          <h2 className="text-xl font-semibold mb-2">Atividades Pendentes</h2>
          <p className="text-yellow-400">⏰ 2 tarefas para entregar esta semana.</p>
        </div>
      </div>
    </div>
  );
}