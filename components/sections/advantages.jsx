import { Headset, Globe, Target, Zap, Trophy, Users } from "lucide-react";

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
]

export default function Advantages() {
  return (
    <section className="flex flex-col w-full items-center py-20 bg-linear-to-tl from-(--color-1)/40 to-50% to-white ">
      <div className="mb-14 text-center">
        <h1 className="text-5xl font-bold">Por que escolher a AlphaDev?</h1>
        <p className="text-gray-500 text-sm mt-4">Tudo que você precisa para evoluir na carreira em um só lugar.</p>
      </div>

      <div className="grid grid-cols-2 gap-6 px-60 w-full">
        {vantagens.map((v, i) => (
          <div key={i} className="group bg-white flex flex-col gap-4 p-6 border-2 border-gray-200 rounded-xl hover:shadow-md hover:border-sky-400 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500">
              {v.icone}
            </div>
            <h3 className="text-lg font-bold text-black group-hover:text-sky-500 transition-colors duration-300">{v.titulo}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}