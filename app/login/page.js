// Pegamos o formulário de Login que desenhamos lá na pasta "sections".
// Esse formulário serve para quem já tem conta colocar e-mail e senha e poder entrar.
import Login from "./sections/login";

// Esta é a função principal que desenha a tela de Login do nosso site.
export default function Register() {
  return (
    // <main> é a nossa caixa principal que abraça todo o conteúdo da página.
    <main>
      {/* Colocamos o formulário de Login aqui no meio para a criança conseguir digitar os dados dela! */}
      <Login />
    </main>
  );
}