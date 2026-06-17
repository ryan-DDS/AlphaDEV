// "use client" avisa ao Next.js que este topo de página tem cliques (como abrir o menu de cursos).
"use client";

// Importamos useState para gerenciar se o menu de cursos está aberto ou fechado.
import { useState } from "react";

// Importamos o componente de Imagem para a logo.
import Image from "next/image";

// Importamos o componente Link para podermos viajar entre as páginas.
import Link from "next/link";

// Importamos ícones de setinhas para cima/baixo e setinha diagonal do Lucide.
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";

// Importamos o nosso próprio componente de Botão Customizado (Button) criado na pasta ui!
import Button from "@/components/ui/button";

// Criamos uma listona com 3 listas dentro dela. É uma lista de colunas para o nosso menu de cursos.
// O computador consegue ler essa "lista de listas" para criar 3 colunas de links bonitinhos.
const cursos = [
  ["Curso Front-End", "Curso .Net e C#", "ChatGPT"],
  ["Curso Back-end", "Curso IA", "Curso SQL"],
  ["Curso Full-Stack", "Curso JavaScript", "Veo3"],
];

// Fábrica do Menu Superior (Header)
export default function Header() {
  // Caixinha de memória 'openCursos' que guarda: "O menu de cursos está aberto (true) ou fechado (false)?"
  const [openCursos, setOpenCursos] = useState(false);

  return (
    // A tag <header> diz ao navegador que este é o topo do site.
    // Usamos classes como "fixed top-7 left-1/2 -translate-x-1/2" para deixar o menu flutuando bem no topo da tela!
    // bg-gray-900/70 deixa o fundo cinza meio transparente e backdrop-blur-md dá um efeito embaçado fosco de vidro.
    <header className="fixed top-7 left-1/2 -translate-x-1/2 justify-center rounded-[50px] z-50 px-20 grid grid-cols-3 items-center h-16 w-10/12 bg-gray-900/70 backdrop-blur-md border border-violet-950">
      
      {/* Coluna 1: O Logotipo da AlphaDEV */}
      <div className="flex items-center gap-2">
        <Link href="#">
          <Image
            src="/images/alphadev1.png"
            alt="Logo"
            width={150}
            height={60}
          />
        </Link>
      </div>

      {/* Coluna 2: Os links de navegação do meio */}
      <div className="flex justify-center gap-6 text-gray-300">
        
        {/* Bloco do botão "Cursos" que abre o menu suspenso (dropdown) */}
        <div className="relative">
          <Button
            // Quando a criança clica no botão, a gente inverte o valor da memória (abre/fecha)!
            onClick={() => setOpenCursos(!openCursos)}
            // Se o menu estiver aberto, a gente aplica uma cor roxa personalizada (!bg-(--color-1))
            className={openCursos ? "!bg-(--color-1) !text-white" : ""}
          >
            Cursos{" "}
            {/* Se o menu estiver aberto, desenha setinha para CIMA. Se estiver fechado, desenha setinha para BAIXO. */}
            {openCursos ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>

          {/* MÁGICA: Se 'openCursos' for VERDADEIRO (true), o computador desenha a caixa de menu abaixo.
              Se for FALSO, o computador ignora tudo aqui dentro e não desenha nada! */}
          {openCursos && (
            <div className="absolute top-10 left-0 w-175 bg-gray-900 border-violet-900 border rounded-xl p-6 shadow-xl z-50">
              <div className="grid grid-cols-4 gap-6">
                <p className="text-white font-semibold">Principais cursos</p>
                
                {/* Primeiro loop: percorre as 3 colunas de cursos */}
                {cursos.map((col, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    {/* Segundo loop: percorre cada curso dentro daquela coluna para gerar os links */}
                    {col.map((item, j) => (
                      <Link
                        key={j}
                        href="#"
                        className="text-white text-sm hover:text-(--color-1) transition-colors underline-animation"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Links simples de conteúdo gratuito e sobre */}
        <Link href="#">
          <Button>Conteúdos gratuitos</Button>
        </Link>
        <Link href="#">
          <Button>Sobre</Button>
        </Link>
      </div>

      {/* Coluna 3: Os botões de Login e Cadastro na direita */}
      <div className="flex justify-end gap-4 items-center">
        <div className="relative">
          {/* Leva o usuário para a página de Login (/login) */}
          <Link href="/login">
            <Button className="text-gray-300 px-4 hover:px-4">
              Login
            </Button>
          </Link>
        </div>
        
        {/* Botão de cadastro roxo com setinha diagonal para cima */}
        <Link
          href="/cadastro"
          className="justify-center items-center px-6 py-2 bg-(--color-1) cursor-pointer text-white rounded-[50px] hover:bg-(--color-1)/70 transition-all duration-300 flex gap-1.5"
        >
          Cadastro
          <ArrowUpRight className="color-white w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}
