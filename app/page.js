// Aqui a gente importa (pega emprestado) vários pedacinhos de páginas (componentes)
// que outras pessoas ou nós mesmos criamos na pasta "components/sections".
// É tipo montar uma casinha de Lego usando vários blocos diferentes!
import Header from "@/components/sections/header";       // O topo da página, com o logotipo e menu.
import Hero from "@/components/sections/hero";           // Aquela parte grandona e bonita com um botão de chamada.
import Learning from "@/components/sections/comunity";   // Seção que mostra sobre a nossa comunidade legal.
import Courses from "@/components/sections/courses";     // Seção onde mostramos os cursos disponíveis.
import Tools from "@/components/sections/tools";         // Ferramentas legais que usamos na nossa escolinha de Devs.
import Invite from "@/components/sections/invite";       // Convite especial para fazer parte do projeto.
import Advantages from "@/components/sections/advantages"; // As vantagens maravilhosas de estudar com a gente.
import Bundles from "@/components/sections/bundles";     // Pacotes de cursos ou planos legais.
import Footer from "@/components/sections/footer";       // O rodapé lá embaixo com os direitos autorais e links.

// Esta é a função principal que desenha a nossa página Home (inicial).
export default function Home() {
  return (
      // A tag <main> avisa ao computador que este é o conteúdo mais importante da nossa página.
      <main>
        {/* Agora, nós colocamos cada pecinha de Lego na ordem que queremos que apareça na tela: */}
        <Header />
        <Hero />
        <Learning />
        <Courses />
        <Tools />
        <Invite />
        <Advantages />
        <Bundles />
        <Footer />
      </main>
  );
}