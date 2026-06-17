// Criamos uma listona com vários objetos. Cada objeto descreve o nome de uma habilidade ou ferramenta em alta.
const tools = [
  { nome: "Engenharia de Prompt" },
  { nome: "ChatGPT" },
  { nome: "Gemini" },
  { nome: "Dola AI" },
  { nome: "Veo3" },
  { nome: "Front-End" },
  { nome: "Back-End" },
  { nome: "Java" },
  { nome: "C#" },
  { nome: "JavaScript" },
  { nome: "Arquitetura de Software" },
  { nome: "Banco de Dados" },
  { nome: "SQL" },
  { nome: "APIs" },
  { nome: "Tech Product Manager" },
];

// Fábrica do componente Tools (que mostra as habilidades/ferramentas)
export default function Tools() {
  return (
    // Seção com fundo gradiente roxo e preto
    <section className="pb-10 bg-gradient-to-tr from-[#12012a] via-[#0d0d0d] to-[#1a0a2e] pb-10">
      
      {/* Um divisor bonitinho com uma linha de 1 pixel de altura (h-px) */}
      <div className="flex flex-col justify-center items-center mb-10">
        <div className="h-px w-10/12 bg-violet-800/40 rounded-sm" />
      </div>

      {/* Caixa de textos explicativos */}
      <div className="relative z-20 flex flex-col justify-center h-full pl-60 pt-10">
        <h2 className="text-purple-300 text-2xl font-semibold mb-4">
          Habilidades e ferramentas em alta
        </h2>
        <p className="text-gray-400 text-sm max-w-xl">
          Explore temas e tecnologias em destaque no mercado de trabalho.
        </p>
      </div>

      {/* Caixa em grade de 3 colunas para colocar os cartões de habilidades lado a lado */}
      <div className="px-60 py-10 grid grid-cols-3 gap-6">
        {/* Percorremos a nossa listona 'tools' com o map.
            Para cada item (tool), desenhamos uma caixinha com bordas bem arredondadas (rounded-[50px])
            e cursor-pointer (para fazer a setinha do mouse virar uma mãozinha amigável!). */}
        {tools.map((tool, i) => (
          <div
            key={i}
            className="justify-center cursor-pointer bg-[#1a1a2e] rounded-[50px] p-4 flex items-center gap-4 border-2 border-[#2d1b4e] hover:border-violet-600 hover:shadow-[0_4px_16px_#7c3aed22] transition-all duration-300 hover:-translate-y-1"
          >
            {/* O texto do nome da habilidade */}
            <span className="text-gray-200 font-medium">{tool.nome}</span>
          </div>
        ))}
      </div>
    </section>
  );
}