import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="h-screen flex flex-col">
      {/* Banner com overlay */}
      <div
        className="relative flex-1 flex items-center justify-start"
        style={{
          backgroundImage: "url('/images/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative flex flex-col justify-center px-60 z-10">
          <h1 className="text-6xl font-bold text-white leading-tight mb-4">
            Seja <span className="text-(--color-1)">relevante</span> na era da{" "}
            <br /> Inteligência Artificial
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Cursos, comunidades e mão na massa. Aprenda agora as habilidades e
            ferramentas <br />
            mais estratégicas para o mercado de trabalho.
          </p>
          <Link
            href="#"
            className="flex items-center gap-2 hover:bg-(--color-1)/70 bg-(--color-1) text-white font-semibold w-fit py-3 px-6 rounded-[50px] transition-all duration-300"
          >
            Saiba mais
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="px-90 w-full h-28 bg-gray-900 flex">
        <div className="flex items-center gap-4 mt-6">
          <Image
            src="/images/alphadev1.png"
            alt="Logo"
            width={120}
            height={60}
          />
          <div className="w-0.5 rounded-sm bg-purple-500 h-10"></div>
          <h1 className="text-lg font-semibold text-gray-300">Comunidade</h1>
        </div>
      </div>
    </section>
  );
}
