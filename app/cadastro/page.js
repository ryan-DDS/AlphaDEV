// Aqui a gente importa (pega emprestado) o componente de Cadastro.
// Esse componente é o formulário onde o novo usuário vai digitar o nome, e-mail e senha dele.
import Cadastro from "./sections/cadastro";

// Esta é a função principal que fabrica a página de Cadastro do nosso site.
export default function Register() {
  return (
    // A tag <main> é a caixa de papelão principal que segura o conteúdo mais importante desta página.
    <main>
      {/* Aqui a gente coloca o nosso formulário de Cadastro de Lego para desenhar ele na tela. */}
      <Cadastro />
    </main>
  );
}
