import { Users, School, GraduationCap, CircleCheck } from "lucide-react";

const planos = [
  {
    icon: Users,
    categoria: "Área de Conhecimento",
    titulo: "Student Pro",
    descricao: "Grupos de Alunos por Área",
    preco: "Consulte",
    beneficios: [
      "Projetos práticos desde a primeira aula",
      "HTML, CSS, JavaScript e TypeScript",
      "React, Next.js e desenvolvimento moderno",
      "Banco de dados SQL e NoSQL",
      "Git e GitHub para controle de versões",
      "Integração com APIs e serviços web",
      "Inteligência Artificial aplicada ao desenvolvimento",
      "Mentoria com profissionais da área",
      "Desafios inspirados em problemas reais",
      "Construção de portfólio profissional",
      "Preparação para entrevistas técnicas",
      "Certificado de conclusão",
    ],
  },
  {
    icon: School,
    categoria: "Escola",
    titulo: "School Pro",
    descricao: "Indicado para escolas públicas ou privadas",
    preco: "Consulte",
    beneficios: [
      "Gestão completa de turmas e professores",
      "Painel administrativo para a escola",
      "Acompanhamento do desempenho dos alunos",
      "Relatórios pedagógicos em tempo real",
      "Trilhas de programação estruturadas",
      "Biblioteca de projetos e exercícios",
      "Controle de matrículas e acessos",
      "Integração entre coordenação e docentes",
      "Conteúdo atualizado com o mercado de tecnologia",
      "Preparação dos alunos para o mercado de trabalho",
      "Capacitação contínua para professores",
      "Suporte especializado para instituições",
    ],
  },
  {
    icon: GraduationCap,
    categoria: "Grupo de Professores",
    titulo: "Teacher Pro",
    descricao: "Ideal para equipes docentes",
    preco: "Consulte",
    beneficios: [
      "Plano de aulas pronto para programação",
      "Materiais didáticos atualizados",
      "Banco de exercícios e desafios",
      "Projetos práticos para os alunos",
      "Correção e acompanhamento de atividades",
      "Avaliações prontas e personalizáveis",
      "Conteúdo sobre IA aplicada à educação",
      "Gestão simplificada das turmas",
      "Certificado para formação continuada",
      "Comunidade exclusiva de professores",
      "Suporte pedagógico especializado",
      "Acesso a novas tecnologias do mercado",
    ],
  },
];

export default function Bundles() {
  return (
    <section className="bg-gradient-to-br from-[#260555] via-[#0d0d0d] to-[#3a1963] min-h-screen py-20">
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center text-white text-center">
          <h1 className="text-5xl font-bold mb-4    ">Planos e Licenciamento</h1>
          <p className="text-gray-400 text-sm">Escolha o plano ideal para sua necessidade</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 px-8">
          {planos.map((plano, index) => {
            const Icon = plano.icon;

            return (
              <div key={index} className="bg-gray-900 w-100 rounded-xl">
                {/* Topo */}
                <div className="p-8">
                  <div className="bg-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6">
                    <Icon size={20} />
                  </div>

                  <span className="border border-purple-500 text-purple-600 text-sm px-2 rounded-full">
                    {plano.categoria}
                  </span>

                  <h3 className="text-xl text-white font-bold mt-5">
                    {plano.titulo}
                  </h3>

                  <p className="text-gray-200 mt-3">{plano.descricao}</p>

                  <h2 className="text-2xl font-bold text-purple-600 mt-8">
                    {plano.preco}
                  </h2>

                  <button className="w-full cursor-pointer mt-8 border-1 border-purple-600 text-purple-600 py-3 rounded-[50px] font-medium hover:bg-purple-600 hover:text-white transition-all duration-300">
                    Falar com Consultor
                  </button>
                </div>

                {/* Benefícios */}
                <div className="border-t p-8 border-violet-800">
                  <ul className="space-y-4">
                    {plano.beneficios.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CircleCheck
                          size={20}
                          className="text-green-500 mt-1 shrink-0"
                        />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}