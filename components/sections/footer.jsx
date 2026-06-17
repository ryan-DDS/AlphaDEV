// Importamos o "Link" para podermos clicar e navegar pelo site.
import Link from "next/link";

// Importamos a "Image" do Next.js para carregar imagens e logotipos.
import Image from "next/image";

// Importamos ícones da biblioteca Lucide para desenhar cartinhas, telefones e pinos de mapa.
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

// Colocamos as listonas de links do site aqui fora do componente.
// Fazemos isso para o computador não ter que recriar essa lista toda vez que a tela redesenhar. É mais rápido!
const site_links = ["Início", "Cursos", "Conteúdos Gratuitos", "Sobre"];
const external_links = ["Comunidade", "Para Empresas", "Seja Revendedor"];

// Fábrica do Rodapé (Footer)
export default function Footer() {
  return (
    // A tag <footer> avisa que esta é a parte final do site, que fica lá no chão da página.
    <footer className="bg-[#0d1117] text-gray-300 pt-16 pb-8">
      {/* Caixa centralizadora para alinhar as 4 colunas de informações */}
      <div className="max-w-7xl mx-auto px-20">
        
        {/* Grade de 4 colunas */}
        <div className="grid grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Coluna 1: Logo da AlphaDev e breve descrição */}
          <div className="flex flex-col gap-5">
            <Link href="#">
              <Image src="/images/alphadev1.png" alt="AlphaDev" width={140} height={50} />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Plataforma de cursos de tecnologia e Inteligência Artificial focada em resultados reais no mercado de trabalho.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos gerados a partir do array 'site_links' */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase">Links Rápidos</h4>
            {site_links.map((item, i) => (
              <Link key={i} href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          {/* Coluna 3: Recursos gerados a partir do array 'external_links' */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase">Recursos</h4>
            {external_links.map((item, i) => (
              <Link key={i} href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          {/* Coluna 4: Informações de Contato da escola */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase">Contato</h4>
            <div className="flex flex-col gap-3">
              
              {/* Link de E-mail (mailto:) que abre o aplicativo de e-mail do usuário quando clicado! */}
              <a href="mailto:contato@alphadev.com.br" className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                <Mail size={14} className="shrink-0" />
                contato@alphadev.com.br
              </a>
              
              {/* Link de Telefone (tel:) que liga direto se clicado no celular! */}
              <a href="tel:+5588999999999" className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                <Phone size={14} className="shrink-0" />
                +55 (88) 99999-9999
              </a>
              
              {/* Endereço físico da sede da escola */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={14} className="shrink-0" />
                Fortaleza - CE, Brasil
              </div>
              
              {/* Aviso de segurança com ícone de escudo verde */}
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

        {/* Parte bem debaixo com o copyright legal do site */}
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