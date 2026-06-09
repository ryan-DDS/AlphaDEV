const tools = [
  {
    nome: "Engenharia de Prompt",
  },
  {
    nome: "ChatGPT",
  },

  {
    nome: "Gemini",
  },

  {
    nome: "JusIA",
  },

  {
    nome: "Veo3",
  },

  {
    nome: "Front-End",
  },

  {
    nome: "Back-End",
  },

  {
    nome: "Java",
  },

  {
    nome: "C#",
  },

  {
    nome: "JavaScript",
  },

  {
    nome: "Arquitetura de Software",
  },
  {
    nome: "Banco de Dados",
  },
  {
    nome: "SQL",
  },
  {
    nome: "APIs",
  },
  {
    nome: "Tech Product Manager",
  },
];

export default function Tools() {
  return (
    <section className="bg-linear-to-tl from-(--color-1) to-30% to-white">
        <div className="flex flex-col justify-center items-center mb-10">
            <div className="h-0.5 w-10/12 bg-gray-300/50 rounded-sm" />
        </div>
      <div className="relative z-20 flex flex-col justify-center h-full pl-60 max-w-3xl">
        <h2 className="text-gray-800 text-2xl font-semibold mb-4">
          Habilidades e ferramentas em alta
        </h2>
        <p className="text-gray-500 text-sm max-w-xl">
          Explore temas e tecnologias em destaque no mercado de trabalho.
        </p>
      </div>
      <div className="px-60 py-10 grid grid-cols-3 gap-6">
        {tools.map((tool, i) => (
            <div key={i} className="justify-center cursor-pointer hover:bg-gray-100/50 rounded-[50] p-4 flex items-center gap-4 hover:border-2 border-2 border-transparent hover:border-sky-400 transition-all duration-300 hover:-translate-y-1.25">
              <span className="text-gray-700 font-medium">{tool.nome}</span>
            </div>
        ))}
        </div>
    </section>
  );
}
