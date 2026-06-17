// Importamos o componente Image para carregar o logotipo.
import Image from "next/image";

// Importamos a tag Link para navegar pelo site.
import Link from "next/link";

// Importamos o nosso botão mágico (Button).
import Button from "@/components/ui/button";

// Importamos o ícone de setinha para o canto superior direito (ArrowUpRight).
import { ArrowUpRight } from "lucide-react";

// Fábrica do componente Hero (A primeira tela gigante que chama a atenção do visitante!)
export default function Hero() {
  return (
    // <section> que ocupa a altura inteira da tela da criança (h-screen).
    <section id="hero" className="h-screen flex flex-col">
      
      {/* Banner de cima que tem a foto bonita de fundo */}
      <div
        className="relative flex-1 flex items-center justify-start"
        // Colocamos a imagem '/images/bannerroxo.png' como papel de parede deste bloco.
        style={{
          backgroundImage: "url('/images/bannerroxo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Máscara preta semi-transparente para o título branco ficar legível por cima da imagem */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Caixa de textos que fica por cima de tudo (z-10) e recuada para a direita (px-60) */}
        <div className="relative flex flex-col justify-center px-60 z-10">
          {/* Título gigante com uma palavra roxa destacada (<span className="text-(--color-1)">) */}
          <h1 className="text-6xl font-bold text-white leading-tight mb-4">
            Seja <span className="text-(--color-1)">relevante</span> na era da{" "}
            <br /> Inteligência Artificial
          </h1>
          {/* Parágrafo com letra um pouco menor explicando a missão da escola */}
          <p className="text-lg text-gray-200 mb-8">
            Cursos, comunidades e mão na massa. Aprenda agora as habilidades e
            ferramentas <br />
            mais estratégicas para o mercado de trabalho.
          </p>
          {/* Botão de chamada para ação estilo pílula (rounded-[50px]) */}
          <Link
            href="#"
            className="flex items-center gap-2 hover:bg-(--color-1)/70 bg-(--color-1) text-white font-semibold w-fit py-3 px-6 rounded-[50px] transition-all duration-300"
          >
            Saiba mais
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Faixa inferior cinza escuro do banner (bg-gray-900) */}
      <div className="px-90 w-full h-28 bg-gray-900 flex">
        <div className="flex items-center gap-4 mt-6">
          {/* Logotipo da AlphaDEV */}
          <Image
            src="/images/alphadev1.png"
            alt="Logo"
            width={120}
            height={60}
          />
          {/* Uma barrinha roxa vertical que serve de separador visual (h-10) */}
          <div className="w-0.5 rounded-sm bg-purple-500 h-10"></div>
          {/* Título da seção indicando "Comunidade" */}
          <h1 className="text-lg font-semibold text-gray-300">Comunidade</h1>
        </div>
      </div>
    </section>
  );
}
