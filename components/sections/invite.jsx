// Importamos a "Image" do Next.js para carregar fotos ilustrativas.
import Image from "next/image";

// Fábrica do componente Invite (O convite com números e estatísticas da AlphaDev)
export default function Invite() {
  return (
    // <section> com uma imagem de grade roxa no fundo (graderoxa.png)
    <section
      className="flex h-200 flex-col "
      style={{
        backgroundImage: "url('/images/graderoxa.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Título de convite no topo da seção */}
      <div className="pl-60 mt-30">
        <h1 className="text-5xl text-white font-bold">
          Junte-se a quem já entrou na Era <br /> da IA. Junte-se à{" "}
          <span className="text-(--color-1)">AlphaDev.</span>
        </h1>
      </div>

      {/* Caixa que alinha as 3 colunas de estatísticas horizontalmente (flex) e centralizado (justify-center) */}
      <div className="flex items-center justify-center gap-50 w-full pt-30">
        
        {/* Coluna 1: Total de alunos matriculados */}
        {/* Usamos a classe 'group' na div mãe. Toda vez que passarmos o mouse nela,
            qualquer elemento filho com a classe 'group-hover:' vai mudar de cor ou tamanho automaticamente! */}
        {/* 'hover:-translate-y-2.5' faz a caixinha subir um pouquinho quando passamos o mouse por cima. É bem divertido! */}
        <div className="group flex flex-col hover:-translate-y-2.5 scale-110 hover:scale-115 transition-all duration-300 w-55 items-start">
          <Image
            src="/images/person.png"
            alt="Logo"
            width={150}
            height={75}
            className="mb-4"
          />
          <div className="text-left">
            <h1 className="text-5xl font-bold text-white mb-2 group-hover:text-(--color-1) transition-all duration-300">150.000+</h1>
            <p className="text-gray-200 text-sm leading-relaxed">
              pessoas já aprenderam IA e Tech na prática com a AlphaDev.
            </p>
          </div>
        </div>

        {/* Coluna 2: Total de pessoas na comunidade */}
        <div className="group flex flex-col hover:-translate-y-2.5 scale-110 hover:scale-115 transition-all duration-300 w-55 items-start">
          <Image
            src="/images/chat.png"
            alt="Logo"
            width={150}
            height={75}
            className="mb-4"
          />
          <div className="text-left">
            <h1 className="text-5xl font-bold text-white mb-2 group-hover:text-(--color-1) transition-all duration-300">15.000+</h1>
            <p className="text-gray-200 text-sm leading-relaxed">
              pessoas participam ativamente das nossas comunidades diariamente.
            </p>
          </div>
        </div>

        {/* Coluna 3: Total de empresas parceiras */}
        <div className="group flex flex-col hover:-translate-y-2.5 scale-110 hover:scale-115 transition-all duration-300 w-55 items-start ">
          <Image
            src="/images/group.png"
            alt="Logo"
            width={175}
            height={75  }
            className="mb-4"
          />
          <div className="text-left">
            <h1 className="text-5xl font-bold text-white mb-2 group-hover:text-(--color-1) transition-all duration-300">1.000+</h1>
            <p className="text-gray-200 text-sm leading-relaxed">
              empresas já desenvolveram seus times com a AlphaDev. <br /> {''} <br /> {''} <br /> {''}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
