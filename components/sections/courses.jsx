// "use client" avisa que esta parte da página tem cliques e botões dinâmicos que rodam no navegador da criança.
"use client";

// Importamos o useState para saber se mostramos todos os cursos ou só alguns.
import { useState } from "react";

// Importamos a tag "Link" para navegar sem travar.
import Link from "next/link";

// Importamos alguns ícones legais da biblioteca Lucide.
import { ArrowUpRight, Gavel, Plus, Minus } from "lucide-react";

// Uma listona de objetos (cursos) contendo informações sobre os cursos da AlphaDev.
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

// Um dicionário de roupas (classes CSS) para as tags.
// Se a tag for "GRATUITO", ele pinta de verde. Se for "MAIS VENDIDO", pinta de amarelo.
const tagStyles = {
  GRATUITO: "border-emerald-500/60 text-emerald-400",
  "MAIS VENDIDO": "border-amber-500/60 text-amber-400",
  LANÇAMENTO: "border-amber-500/60 text-amber-400",
  "ÚLTIMOS DIAS": "border-violet-500 text-violet-400",
  "VAGAS LIMITADAS": "border-violet-500 text-violet-400",
};

// Fábrica do componente Courses
export default function Courses() {
  // Caixinha de memória 'mostrarTodos' para ligar/desligar a visualização de toda a lista de cursos (começa como false / desligado).
  const [mostrarTodos, setMostrarTodos] = useState(false);

  // Se 'mostrarTodos' for verdadeiro, a gente pega a lista de cursos inteira.
  // Se for falso, o 'slice(0, 6)' recorta a lista para mostrar apenas os primeiros 6 cursos.
  const cursosVisiveis = mostrarTodos ? cursos : cursos.slice(0, 6);

  return (
    // Seção escura com gradiente de roxo para preto
    <section className="bg-gradient-to-br from-[#12012a] via-[#0d0d0d] to-[#1a0a2e]">
      
      {/* Banner Principal com um título chamativo */}
      <div className="relative w-full h-96 overflow-hidden bg-gradient-to-br from-[#2d0a5c] via-[#1a0530] to-[#0a0a0a]">
        <div className="relative z-20 flex flex-col justify-center h-full pl-60 w-400">
          <h1 className="text-white text-5xl font-bold mb-6 mt-10">
            Escolha por onde começar a <br />
            <span className="text-violet-400">transformar</span> sua carreira
          </h1>
          <h2 className="text-purple-300 text-2xl font-semibold mb-4">
            Cursos e Formações em destaque
          </h2>
          <p className="text-gray-400 text-sm max-w-xl">
            Inteligência Artificial, Programação e Produto. Confira a melhor
            opção para o seu momento de vida e objetivos de carreira.
          </p>
        </div>
      </div>

      {/* Uma linha divisória super elegante, que começa transparente, fica roxa no meio e volta a ser transparente */}
      <div className="h-px mx-16 bg-gradient-to-r from-transparent via-violet-800 to-transparent" />

      {/* Caixa em grade para mostrar os cartões de cursos */}
      <div className="px-60 pt-8 pb-4 grid grid-cols-3 gap-6">
        
        {/* Percorremos a lista recortada 'cursosVisiveis' */}
        {cursosVisiveis.map((curso, i) => (
          <div
            key={i}
            className="bg-[#1a1a2e] rounded-xl p-6 flex flex-col gap-4 border-2 border-[#2d1b4e] hover:border-violet-600 hover:shadow-[0_8px_24px_#7c3aed22] transition-all duration-300 hover:translate-y-[-5px]"
          >
            {/* Se o curso tiver alguma tag cadastrada (curso.tags.length > 0): */}
            {curso.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {/* Outro loop (map)! Percorremos as tags deste curso específico para criar cracházinhos */}
                {curso.tags.map((tag, j) => (
                  <span
                    key={j}
                    // Procuramos a cor da tag no nosso dicionário 'tagStyles'.
                    // Se não achar nada (??), usa a borda roxa padrão.
                    className={`text-[10px] font-bold tracking-widest border px-2 py-0.5 rounded-full ${
                      tagStyles[tag] ?? "border-violet-500 text-violet-400"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Título do curso e o ícone de martelinho (Gavel) */}
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-gray-100 font-bold text-base leading-snug">
                  {curso.titulo}
                </h3>
                <p className="text-gray-500 text-xs">{curso.info}</p>
              </div>
              <div className="shrink-0 w-14 h-14 rounded-xl bg-violet-950 border border-violet-800/50 flex items-center justify-center">
                <span className="text-violet-400 text-xl">
                  <Gavel />
                </span>
              </div>
            </div>
            
            {/* Descrição do curso */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {curso.desc}
            </p>

            {/* Link para começar o curso */}
            <Link
              href={curso.href}
              className="flex items-center gap-1 hover:bg-violet-600 rounded-[50px] p-2 text-violet-400 hover:text-white text-sm font-medium transition-all duration-300 mt-auto w-fit"
            >
              {curso.cta} <ArrowUpRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      {/* Botão de Ver Mais / Ver Menos */}
      <div className="flex justify-center pb-8 mt-4">
        <button
          // Ao clicar, a gente inverte o valor da caixinha (se era true vira false, se era false vira true!)
          onClick={() => setMostrarTodos(!mostrarTodos)}
          className="flex items-center gap-1 text-violet-400 hover:text-violet-300 font-medium transition-all duration-300 cursor-pointer"
        >
          {/* Mostra textos e setas diferentes de acordo com o estado 'mostrarTodos' */}
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