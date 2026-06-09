"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Gavel, Plus, Minus } from "lucide-react";

const cursos = [
  {
    tags: ["ÚLTIMOS DIAS", "VAGAS LIMITADAS"],
    titulo: "Workshop | Do WhatsApp ao dossiê com IA | 27/05/26",
    info: "Intermediário • 2h • Online e Ao Vivo",
    desc: "Do WhatsApp ao dossiê: montando sua máquina de atendimento automatizado.",
    href: "#",
    cta: "Comece agora",
  },
  {
    tags: ["LANÇAMENTO", "VAGAS LIMITADAS"],
    titulo:
      "Workshop | Prompt Injection: como se preparar para essa ameaça invisível | 09/06/26",
    info: "Iniciante • 2h • Online e Ao Vivo",
    desc: "Prompt Injection: como se preparar para essa ameaça invisível.",
    href: "#",
    cta: "Comece agora",
  },
  {
    tags: ["LANÇAMENTO", "MAIS VENDIDO"],
    titulo: "Vade Mecum dos Prompts",
    info: "Iniciante • Material em PDF",
    desc: "O Vade Mecum dos Prompts é um guia prático para advogados que querem usar IA com critério jurídico, precisão técnica e segurança.",
    href: "#",
    cta: "Comece agora",
  },
  {
    tags: ["GRATUITO"],
    titulo: "Curso de Extensão IA para o Direito",
    info: "Iniciante • 60h • Online e Ao Vivo",
    desc: "Aprofunde seus conhecimentos sobre técnicas e ferramentas de IA aplicadas ao Direito com muita prática.",
    href: "#",
    cta: "Comece agora",
  },
  {
    tags: ["MAIS VENDIDO"],
    titulo: "Curso IA na Prática para Advogados",
    info: "Iniciante • 30h • Online",
    desc: "Aprofunde seus conhecimentos sobre técnicas e ferramentas de IA aplicadas ao Direito, estudando no próprio ritmo.",
    href: "#",
    cta: "Comece agora",
  },
  {
    tags: ["MAIS VENDIDO"],
    titulo: "Curso IA na Prática",
    info: "Iniciante • 25h • Online",
    desc: "Aprenda a utilizar IA com o curso mais prático e atualizado do Brasil e garanta seu lugar no futuro.",
    href: "#",
    cta: "Comece agora",
  },
  {
    tags: ["GRATUITO"],
    titulo: "Curso IA Generativa Aplicada ao Direito, edição 2026",
    info: "Iniciante • 4h • Online",
    desc: "Aprenda IA com quem mais entende de direito e tecnologia e prepare-se para o futuro da profissão. Com conteúdos novos e atualizações!",
    href: "#",
    cta: "Lista de espera",
  },
  {
    tags: ["MAIS VENDIDO"],
    titulo: "Curso Tecnologia para Product Managers",
    info: "Intermediário • 36h • Online",
    desc: "Aprenda conceitos e habilidades fundamentais de tecnologia e alavanque sua carreira como PM.",
    href: "#",
    cta: "Comece agora",
  },
  {
    tags: ["GRATUITO"],
    titulo: "Formação Back-End em .NET e C#",
    info: "Iniciante • 160h • Online",
    desc: "Inicie ou acelere sua carreira tornando-se Dev Backend em .NET e C#. Domine um dos frameworks e linguagens mais requisitados do mercado.",
    href: "#",
    cta: "Comece agora",
  },
];

export default function Courses() {
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const cursosVisiveis = mostrarTodos ? cursos : cursos.slice(0, 6);

  return (
    <section className="bg-linear-to-br from-(--color-1)/90 to-20% to-white">
      {/* Banner */}
      <div className="relative w-full h-96 overflow-hidden">
        <div className="absolute bottom-0 right-0 z-20 h-full flex items-start">
          <Image
            src="/images/programador.png"
            alt="Programador"
            width={700}
            height={400}
            className="object-contain"
          />
        </div>
        <div className="relative z-20 flex flex-col justify-center h-full pl-60 w-400">
          <h1 className="text-black text-5xl font-bold mb-6 mt-10">
            Escolha por onde começar a <br />
            <span className="text-sky-500">transformar</span> sua carreira
          </h1>
          <h2 className="text-gray-800 text-2xl font-semibold mb-4">
            Cursos e Formações em destaque
          </h2>
          <p className="text-gray-500 text-sm max-w-xl">
            Inteligência Artificial, Programação e Produto. Confira a melhor
            opção para o seu momento de vida e objetivos de carreira.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="px-60 pt-8 pb-4 grid grid-cols-3 gap-6">
        {cursosVisiveis.map((curso, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 flex flex-col gap-4 border-2 hover:shadow-md border-gray-200 hover:border-sky-400 transition-all duration-300 hover:translate-y-[-5px]"
          >
            {curso.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {curso.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-[10px] font-bold tracking-widest border border-sky-500 text-sky-500 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-black font-bold text-base leading-snug">
                  {curso.titulo}
                </h3>
                <p className="text-gray-400 text-xs">{curso.info}</p>
              </div>
              <div className="shrink-0 w-14 h-14 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <span className="text-sky-500 text-xl">
                  <Gavel />
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {curso.desc}
            </p>
            <Link
              href={curso.href}
              className="flex items-center gap-1 hover:bg-sky-500 rounded-[50px] p-2 text-sky-500 hover:text-white text-sm font-medium transition-all duration-300 mt-auto w-fit"
            >
              {curso.cta} <ArrowUpRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-8 mt-4">
        <button
          onClick={() => setMostrarTodos(!mostrarTodos)}
          className="flex items-center gap-1 text-sky-500 hover:text-sky-500/70 font-medium transition-all duration-300 cursor-pointer"
        >
          {mostrarTodos ? (
            <>
              Ver Menos <Minus size={14} />
            </>
          ) : (
            <>
              Ver Mais <Plus size={14} />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
