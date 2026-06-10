'use client'
import { useState } from "react";
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
    titulo: "Comunidade ativa",
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

const ITEMS_PER_PAGE = 6;

export default function Advantages() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(vantagens.length / ITEMS_PER_PAGE);
  const visible = vantagens.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section className="flex flex-col w-full items-center py-20 bg-gradient-to-br from-[#12012a] via-[#0d0d0d] to-[#1a0a2e]">
      <div className="mb-14 text-center">
        <h1 className="text-5xl font-bold text-white">
          Por que escolher a AlphaDev?
        </h1>
        <p className="text-gray-400 text-sm mt-4">
          Tudo que você precisa para evoluir na carreira em um só lugar.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 px-60 w-full">
        {visible.map((v, i) => (
          <div
            key={i}
            className="group bg-white/5 flex flex-col gap-4 p-6 border border-white/10 rounded-xl hover:border-purple-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-violet-800 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              {v.icone}
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
              {v.titulo}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Navegação */}
      <div className="flex items-center gap-4 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="w-11 h-11 rounded-full border border-white/15 bg-purple-500/15 text-purple-400 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:bg-purple-500/30"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          className="w-11 h-11 rounded-full border border-white/15 bg-purple-500/15 text-purple-400 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:bg-purple-500/30"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}