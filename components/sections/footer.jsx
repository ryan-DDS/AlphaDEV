import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

// Arrays movidos para fora do componente para melhor performance
const site_links = ["Início", "Cursos", "Conteúdos Gratuitos", "Sobre"];
const external_links = ["Comunidade", "Para Empresas", "Seja Revendedor"];

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-20">
        <div className="grid grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Logo e descrição */}
          <div className="flex flex-col gap-5">
            <Link href="#">
              <Image src="/images/alphadev1.png" alt="AlphaDev" width={140} height={50} />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Plataforma de cursos de tecnologia e Inteligência Artificial focada em resultados reais no mercado de trabalho.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase">Links Rápidos</h4>
            {site_links.map((item, i) => (
              <Link key={i} href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          {/* Recursos */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase">Recursos</h4>
            {external_links.map((item, i) => (
              <Link key={i} href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          {/* Contato */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase">Contato</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:contato@alphadev.com.br" className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                <Mail size={14} className="shrink-0" />
                contato@alphadev.com.br
              </a>
              <a href="tel:+5588999999999" className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                <Phone size={14} className="shrink-0" />
                +55 (88) 99999-9999
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={14} className="shrink-0" />
                Fortaleza - CE, Brasil
              </div>
              <div className="flex items-center gap-2 text-purple-400 text-sm mt-1">
                <ShieldCheck size={14} className="shrink-0" />
                Plataforma 100% Segura
              </div>
              <Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                Acessar canal LGPD
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between pt-8 text-xs text-gray-500">
          <span>© 2026 AlphaDev — Todos os direitos reservados.</span>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Políticas e Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}