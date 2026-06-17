// Importamos o brinquedo "Link" do Next.js para navegar pelas páginas.
import Link from "next/link";

// Importamos o "UsersRound", que é um ícone bonitinho com pessoinhas juntas da biblioteca Lucide.
import { UsersRound } from "lucide-react";

// Fábrica do componente Learning (que fala sobre a nossa comunidade).
export default function Learning() {
  return (
    // <section> é uma caixa invisível para isolar a seção de comunidade.
    <section className="flex" >
      {/* div de fundo cinza escuro (bg-gray-900) que se espalha pela largura total (w-full) */}
      <div className="px-90 bg-gray-900 h-27 w-full">
        {/* Caixa flexível para alinhar o título e o botão lado a lado */}
        <div className="flex items-start mt-0">
          {/* Título principal do banner */}
          <h2 className="text-xl text-white font-bold">
            Conhece a comunidade AlphaDev?{" "}
            {/* Tag span com letra mais fina (font-normal) para a explicação do banner */}
            <span className="font-normal text-white">
              Participe de desafios, eventos, mentorias e networking com outros
              desenvolvedores.
            </span>
          </h2>
          {/* Botão de Link com formato de pílula (rounded-[50px]) para entrar na comunidade */}
          <Link
            href="#"
            className="justify-center items-center px-6 py-2 bg-(--color-1) cursor-pointer text-white rounded-[50px] hover:bg-(--color-1)/70 transition-all duration-300 flex gap-1.5"
          >
            Comunidade
            {/* O ícone de pessoinhas inserido ao lado do texto "Comunidade" */}
            <UsersRound className="color-white w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
