// "use client" avisa ao Next.js que esta página tem cliques, botões e coisas interativas que rodam no navegador.
'use client'

// Importamos o useState para salvar o número da página atual na memória.
import { useState } from "react";

// Importamos uma coleção de desenhos (ícones) prontos do pacote "lucide-react".
// É como abrir uma caixa de adesivos bonitinhos para colar no nosso caderno!
import {
  Headset,
  Globe,
  Target,
  Zap,
  Trophy,
  Users,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Briefcase,
  Code2,
  Network,
  TrendingUp,
  Brain,
} from "lucide-react";

// Criamos uma lista (array vantagens) contendo objetos. Cada objeto descreve uma vantagem da escola.
// Tem o ícone (desenho), o título (nome) e a descrição (detalhe).
const vantagens = [
  {
    icone: <Globe size={28} />,
    titulo: "Conteúdo atualizado",
    desc: "Cursos sempre atualizados com as tecnologias mais relevantes do mercado.",
  },
  {
    icone: <Target size={28} />,
    titulo: "Foco em resultados",
    desc: "Metodologia prática focada em te preparar para o mercado de trabalho real.",
  },
  {
    icone: <Zap size={28} />,
    titulo: "Aprendizado acelerado",
    desc: "Trilhas otimizadas para você aprender mais rápido e com menos esforço.",
  },
  {
    icone: <Users size={28} />,
    titulo: "Comunidade activa",
    desc: "Faça parte de uma comunidade de devs que se ajudam e crescem juntos.",
  },
  {
    icone: <Headset size={28} />,
    titulo: "Suporte especializado",
    desc: "Mentores e suporte disponíveis para tirar suas dúvidas quando precisar.",
  },
  {
    icone: <Trophy size={28} />,
    titulo: "Certificado reconhecido",
    desc: "Certificados validados por mais de 200 empresas parceiras no mercado.",
  },
  {
    icone: <Rocket size={28} />,
    titulo: "Projetos reais",
    desc: "Aprenda desenvolvendo projetos práticos que simulam desafios do mercado.",
  },
  {
    icone: <Briefcase size={28} />,
    titulo: "Preparação para carreira",
    desc: "Desenvolva habilidades técnicas e comportamentais para conquistar oportunidades.",
  },
  {
    icone: <Code2 size={28} />,
    titulo: "Mão na massa",
    desc: "Menos teoria e mais prática para acelerar sua evolução como desenvolvedor.",
  },
  {
    icone: <Network size={28} />,
    titulo: "Networking profissional",
    desc: "Conecte-se com estudantes, mentores e profissionais da área de tecnologia.",
  },
  {
    icone: <TrendingUp size={28} />,
    titulo: "Alta empregabilidade",
    desc: "Conteúdos alinhados às demandas das empresas que mais contratam no setor.",
  },
  {
    icone: <Brain size={28} />,
    titulo: "Aprenda IA na prática",
    desc: "Utilize ferramentas de Inteligência Artificial para aumentar sua produtividade.",
  },
];

// Definimos que só queremos mostrar 6 vantagens de cada vez na tela (para não ficar gigantesco).
const ITEMS_PER_PAGE = 6;

// Fábrica do componente Advantages (Vantagens)
export default function Advantages() {
  // Guardamos na memória qual página de vantagens a criança está vendo (começa na página 0).
  const [page, setPage] = useState(0);

  // Fazemos uma conta de matemática: pegamos o total de vantagens (12) e dividimos pelo limite por página (6).
  // Math.ceil arredonda para cima para garantir que nenhuma vantagem fique de fora!
  const totalPages = Math.ceil(vantagens.length / ITEMS_PER_PAGE);

  // O comando 'slice' recorta a nossa listona de vantagens para pegar apenas as 6 correspondentes à página atual.
  // Ex: se página for 0, pega da vantagem 0 até a 5. Se for 1, pega da 6 até a 11.
  const visible = vantagens.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    // <section> é tipo um bloco isolado da nossa página.
    // Usamos um gradiente de fundo bonito escuro que vai mudando de cor de roxo para preto.
    <section className="flex flex-col w-full items-center py-20 bg-gradient-to-br from-[#12012a] via-[#0d0d0d] to-[#1a0a2e]">
      
      {/* Títulos principais */}
      <div className="mb-14 text-center">
        <h1 className="text-5xl font-bold text-white">
          Por que escolher a AlphaDev?
        </h1>
        <p className="text-gray-400 text-sm mt-4">
          Tudo que você precisa para evoluir na carreira em um só lugar.
        </p>
      </div>

      {/* Caixa organizadora em grade (grid) que mostra os cartões de vantagens */}
      <div className="grid grid-cols-2 gap-6 px-60 w-full">
        {/* Percorremos a nossa lista recortada 'visible' (com 6 itens) usando map.
            Para cada vantagem (v), a gente monta uma div bonitinha com borda e efeito de hover. */}
        {visible.map((v, i) => (
          <div
            key={i}
            className="group bg-white/5 flex flex-col gap-4 p-6 border border-white/10 rounded-xl hover:border-purple-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-violet-800 transition-all duration-300"
          >
            {/* Desenho do ícone da vantagem */}
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              {v.icone}
            </div>
            {/* Título da vantagem */}
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
              {v.titulo}
            </h3>
            {/* Descrição em texto explicativo */}
            <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Barra de Navegação (para mudar de página usando as setas ou botões 1 e 2) */}
      <div className="flex items-center gap-4 mt-10">
        
        {/* Seta para Esquerda (Voltar Página) */}
        <button
          // Ao clicar, a gente diminui 1 da página atual. Math.max garante que não caia abaixo de 0!
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          // O botão fica desativado (disabled) se já estivermos na primeira página (0).
          disabled={page === 0}
          className="w-11 h-11 rounded-full border border-white/15 bg-purple-500/15 text-purple-400 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:bg-purple-500/30"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Botão da Página 1 */}
        <button
          onClick={() => setPage(0)} // Clicou aqui, vai para a página 0.
          // Se a página atual for 0, ele fica roxo destacado, senão fica apagadinho.
          className={`w-11 h-11 rounded-full border transition-all duration-200 flex items-center justify-center text-sm font-medium
            ${page === 0 
              ? "border-purple-500 bg-purple-500 text-white" 
              : "border-white/15 bg-purple-500/5 text-purple-400 hover:bg-purple-500/20"
            }`}
        >
          1
        </button>

        {/* Botão da Página 2 */}
        <button
          onClick={() => setPage(1)} // Clicou aqui, vai para a página 1.
          className={`w-11 h-11 rounded-full border transition-all duration-200 flex items-center justify-center text-sm font-medium
            ${page === 1 
              ? "border-purple-500 bg-purple-500 text-white" 
              : "border-white/15 bg-purple-500/5 text-purple-400 hover:bg-purple-500/20"
            }`}
        >
          2
        </button>

        {/* Seta para Direita (Avançar Página) */}
        <button
          // Ao clicar, avançamos 1 página. Math.min impede de passar do limite máximo de páginas!
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          // Fica desativado se já estivermos na última página.
          disabled={page === totalPages - 1}
          className="w-11 h-11 rounded-full border border-white/15 bg-purple-500/15 text-purple-400 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:bg-purple-500/30"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}