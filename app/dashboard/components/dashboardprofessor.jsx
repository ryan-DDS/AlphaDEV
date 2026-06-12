export default function DashboardProfessor({ user }) {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-purple-400">Painel do Professor</h1>
      <p className="text-gray-400 mb-6">Olá, Prof. {user.nome}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-800 rounded-lg border border-purple-500/20">
          <h2 className="text-xl font-semibold mb-2">Gerenciar Alunos</h2>
          <p className="text-gray-400">42 alunos ativos nas suas turmas.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg border border-purple-500/20">
          <h2 className="text-xl font-semibold mb-2">Lançar Notas</h2>
          <p className="text-gray-400">Cadastre notas e frequências.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg border border-purple-500/20">
          <h2 className="text-xl font-semibold mb-2">Criar Conteúdo</h2>
          <p className="text-purple-400 font-bold">+ Nova Aula</p>
        </div>
      </div>
    </div>
  );
}