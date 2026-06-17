// "use client" avisa ao computador que este arquivo vai rodar no navegador da criança (onde ela clica e digita),
// e não no servidor escondido. É tipo ligar os botões interativos do brinquedo!
"use client";

// Importamos o "useState" do React. Ele cria caixinhas de memória para o computador não esquecer o que digitamos.
import { useState } from "react";

// Importamos o "Link", que é uma porta mágica para viajar para outras páginas sem recarregar o site.
import Link from "next/link";

// Importamos o "Image", um visualizador de fotos super rápido do Next.js que não deixa o site ficar lerdo.
import Image from "next/image";

// Importamos o "useRouter" para ajudar o computador a navegar e mudar de página programaticamente.
import { useRouter } from "next/navigation"; 

// Esta é a fábrica do nosso painel de Cadastro!
export default function Cadastro() {
  // Inicializamos o roteador (useRouter). É tipo o motorista do ônibus que vai levar o usuário para outra tela.
  const router = useRouter(); 
  
  // Criamos a caixinha de memórias 'form' que guarda tudo que a criança digita para se cadastrar.
  // Ela começa com o nome, e-mail e senhas vazios (""), e o perfil padrão definido como "aluno".
  const [form, setForm] = useState({
    nome: "",
    perfil: "aluno",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  // Esta função roda quando a gente aperta o botão de "cadastrar-se" (enviar o formulário).
  async function handleSubmit(e) {
    // e.preventDefault() avisa ao navegador: "Ei, não atualize a página! Deixa que eu cuido do envio aqui no Javascript."
    // Sem isso, a tela piscaria e apagaria tudo que digitamos.
    e.preventDefault();

    // Checa se o computador está conectado na internet. Se não tiver Wi-Fi, ele avisa a criança e para por aqui.
    if (!navigator.onLine) {
      alert("Sem conexão com a internet. Verifique sua rede e tente novamente.");
      return;
    }

    // Validação básica: se faltar o Nome, o E-mail ou a Senha, ele dá um puxão de orelha e não deixa continuar.
    if (!form.nome || !form.email || !form.senha) {
      alert("Preencha todos os campos!");
      return;
    }

    // Se a senha digitada no primeiro campo for diferente da senha do segundo campo, ele avisa que está errado.
    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // O 'fetch' manda um pombo correio (chamada HTTP) para a portinha "/api/usuarios".
      // Ele avisa que está fazendo um "POST" (que serve para criar coisas novas no banco de dados).
      // 'headers' avisa que estamos mandando um arquivo de texto no formato JSON.
      // 'body' leva os dados do formulário transformados em texto pelo brinquedo 'JSON.stringify'.
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Se a portinha "/api/usuarios" responder que deu ruim (!res.ok), a gente avisa sobre o erro.
      if (!res.ok) return alert("Erro ao cadastrar");
      
      // Se deu tudo certo, comemoramos e mandamos o usuário para a página de Login!
      alert("Cadastro realizado com sucesso!");
      router.push("/login"); // O motorista do ônibus leva o usuário direto para a tela de login.
    } catch (error) {
      // Se o servidor estiver quebrado ou desligado, o 'catch' segura o susto e mostra este alerta.
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    // <section> é uma grande divisória na tela.
    // Usamos uma foto de fundo (backgroundImage) vinda da pasta public/images.
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/fullbanner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Esta div preta com transparência (bg-black/60) serve como uma película escura para conseguirmos ler o texto */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Este é o cartãozinho central cinza onde fica o formulário */}
      <div className="relative w-full max-w-md bg-gray-900/70 border border-white/10 rounded-2xl px-10 py-12">
        
        {/* Cabecalho do formulário com o logotipo da AlphaDEV */}
        <div className="flex flex-col mb-2 items-center justify-center gap-x-2">
          {/* O Link nos leva de volta para a página inicial se clicarmos na imagem da logo */}
          <Link href="/">
            <Image
              src="/images/alphadevA.png"
              alt="Logo"
              width={50}
              height={60}
            />
          </Link>
          <h1 className="text-white text-3xl font-bold mb-1">Bem-vindo</h1>
          <p className="text-white/50 text-sm mb-2">
            Crie uma conta para continuar
          </p>
        </div>

        {/* O formulário de verdade! Quando clicamos no botão de enviar, ele chama a função handleSubmit lá de cima */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          
          {/* Campo de digitar o Nome */}
          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">
              Nome
            </p>
            <input
              value={form.nome} // O valor que aparece na caixinha é o que está salvo na memória 'form.nome'
              // Toda vez que a criança digita uma letrinha nova (onChange), a gente atualiza a memória:
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              type="text"
              placeholder="nome"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-600 transition-all duration-300"
            />
          </div>

          {/* Botões para selecionar se você é Aluno, Professor ou Administrador */}
          <div className="flex flex-col gap-y-2">
            <p className="text-white/70 text-xs tracking-widest uppercase">
              Perfil
            </p>
            <div className="grid grid-cols-3 gap-2">
              
              {/* Botão de Aluno */}
              <button
                type="button" // type="button" avisa para não tentar enviar o formulário quando clicado!
                onClick={() => setForm({ ...form, perfil: "aluno" })}
                // Se o perfil escolhido for "aluno", ele fica roxinho (bg-violet-600), senão fica cinza escuro.
                className={`px-4 py-3 cursor-pointer rounded-sm text-sm font-medium transition-all duration-300 border ${
                  form.perfil === "aluno"
                    ? "bg-violet-600 border-violet-600 text-white"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                Aluno
              </button>

              {/* Botão de Professor */}
              <button
                type="button"
                onClick={() => setForm({ ...form, perfil: "professor" })}
                className={`px-4 py-3 cursor-pointer rounded-sm text-sm font-medium transition-all duration-300 border ${
                  form.perfil === "professor"
                    ? "bg-violet-600 border-violet-600 text-white"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                Professor
              </button>

              {/* Botão de Administrador (Dono do parquinho) */}
              <button
                type="button"
                onClick={() => setForm({ ...form, perfil: "admin" })}
                className={`px-4 py-3 cursor-pointer rounded-sm text-sm font-medium transition-all duration-300 border ${
                  form.perfil === "admin"
                    ? "bg-violet-600 border-violet-600 text-white"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Campo de digitar o E-mail */}
          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">
              Email
            </p>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="@email.com"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-600 transition-all duration-300"
            />
          </div>

          {/* Campo de digitar a Senha */}
          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">
              Senha
            </p>
            <input
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              type="password"
              placeholder="senha"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-600 transition-all duration-300"
            />
          </div>

          {/* Campo para confirmar a Senha (para ter certeza de que não digitou errado!) */}
          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">
              Confirmar Senha
            </p>
            <input
              value={form.confirmarSenha}
              onChange={(e) =>
                setForm({ ...form, confirmarSenha: e.target.value })
              }
              type="password"
              placeholder="confirmar senha"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-600 transition-all duration-300"
            />
          </div>

          {/* O botão roxo que envia tudo! type="submit" avisa que ele vai disparar o formulário. */}
          <button
            type="submit"
            className="bg-violet-700 cursor-pointer text-white text-sm font-bold uppercase tracking-widest py-3 rounded-sm hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 mt-2"
          >
            cadastrar-se
          </button>
        </form>

        {/* Uma linha bonitinha com um texto "ou" no meio, para separar as opções de cadastro e de login. */}
        <div className="flex items-center gap-x-4 my-6">
          <div className="flex-1 h-[0.5px] bg-white/10" />
          <span className="text-white/30 text-xs">ou</span>
          <div className="flex-1 h-[0.5px] bg-white/10" />
        </div>

        {/* Link para quem já tem conta ir direto para a página de Login */}
        <p className="text-center text-white/50 text-sm">
          Já possui uma conta?{" "}
          <Link
            href="/login"
            className="text-violet-600 hover:text-violet-500 transition-all duration-300"
          >
            Faça login
          </Link>
        </p>
      </div>
    </section>
  );
}