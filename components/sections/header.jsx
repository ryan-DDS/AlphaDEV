"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/button";

const cursos = [
  ["Curso Front-End", "Curso .Net e C#", "ChatGPT"],
  ["Curso Back-end", "Curso IA", "Curso SQL"],
  ["Curso Full-Stack", "Curso JavaScript", "Veo3"],
];


export default function Header() {
  const [openCursos, setOpenCursos] = useState(false);

  return (
    <header className="fixed top-7 left-1/2 -translate-x-1/2 justify-center rounded-[50px] z-50 px-20 grid grid-cols-3 items-center h-16 w-10/12 bg-gray-900/70 backdrop-blur-md border border-violet-950">
      {/* Logo */}
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

      {/* Nav */}
      <div className="flex justify-center gap-6 text-gray-300">
        {/* Cursos com dropdown */}
        <div className="relative">
          <Button
            onClick={() => setOpenCursos(!openCursos)}
            className={openCursos ? "!bg-(--color-1) !text-white" : ""}
          >
            Cursos{" "}
            {openCursos ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>

          {openCursos && (
            <div className="absolute top-10 left-0 w-175 bg-gray-900 border-violet-900 border rounded-xl p-6 shadow-xl z-50">
              <div className="grid grid-cols-4 gap-6">
                <p className="text-white font-semibold">Principais cursos</p>
                {cursos.map((col, i) => (
                  <div key={i} className="flex flex-col gap-4">
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

        <Link href="#">
          <Button>Conteúdos gratuitos</Button>
        </Link>
        <Link href="#">
          <Button>Sobre</Button>
        </Link>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-4 items-center">
        <div className="relative">
          <Link href="/login">
          <Button
            className="text-gray-300 px-4 hover:px-4"
          >
            Login
          </Button>
          </Link>
        </div>
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
