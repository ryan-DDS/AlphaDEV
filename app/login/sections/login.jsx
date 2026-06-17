// "use client" avisa ao computador que esse arquivo roda no navegador da criança (onde aparecem botões, inputs, etc.)
// e não no servidor escondido lá longe.
"use client";

// Importamos o "useState" para guardar coisas na memória temporária do navegador.
import { useState } from "react";

// Importamos a tag "Link" para criar links que nos levam para outros caminhos sem recarregar a tela inteira.
import Link from "next/link";

// Importamos a tag "Image" do Next.js para carregar fotos de um jeito super rápido e eficiente.
import Image from "next/image";

// Importamos o "useRouter" para poder mandar o usuário para outra página via código (ex: após logar).
import { useRouter } from "next/navigation";

// Esta é a fábrica que constrói a nossa tela de Login!
export default function Login() {
  // Pegamos o motorista do ônibus (router) para podermos navegar de página.
  const router = useRouter();
  
  // Criamos uma caixinha de memória 'form' para guardar o E-mail e Senha que a pessoa digitar.
  const [form, setForm] = useState({ email: "", senha: "" });
  
  // Criamos outra caixinha de memória chamada 'erro'. Se a senha estiver errada ou der algum problema,
  // nós colocamos o texto do erro aqui dentro para desenhar ele em vermelho na tela da criança.
  const [erro, setErro] = useState("");

  // Esta função é disparada quando a criança clica no botão "entrar" (ou aperta Enter).
  async function handleSubmit(e) {
    // e.preventDefault() impede a página de recarregar e perder tudo o que foi digitado!
    e.preventDefault();
    
    // Limpamos qualquer mensagem de erro antiga da tela antes de tentar de novo.
    setErro("");

    // Checa se o computador tem sinal de internet (Wi-Fi). Se não tiver, avisa e para.
    if (!navigator.onLine) {
      alert("Sem conexão com a internet.");
      return;
    }

    // Se a pessoa esqueceu de preencher o e-mail ou a senha, a gente avisa e não deixa prosseguir.
    if (!form.email || !form.senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    try {
      // Mandamos o pombo correio (fetch) até a rota "/api/login" avisando que queremos enviar dados ("POST").
      // Mandamos os dados do formulário transformados em texto (JSON.stringify).
      const res = await fetch("/api/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Lemos a resposta que o servidor mandou de volta.
      const dados = await res.json();

      // Se a resposta do servidor não for positiva (!res.ok), a gente joga um erro pro ar (throw new Error)!
      if (!res.ok) {
        throw new Error(dados.error || "Erro ao fazer login");
      }

      // Se deu tudo certo e o login foi aceito, o motorista do ônibus leva a gente para a tela "/dashboard"!
      router.push("/dashboard");
      // O 'refresh()' dá uma atualizada rápida nos dados para garantir que a página nova já veja que estamos logados.
      router.refresh(); 

    } catch (err) {
      // Se deu qualquer problema (senha incorreta, servidor desligado, etc.),
      // o 'catch' pega a mensagem de erro e salva na nossa caixinha 'erro' para exibir na tela!
      setErro(err.message);
    }
  }

  return (
    // Seção principal com uma foto bonita de fundo (fullbanner.png) vinda da pasta public/images.
    <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/fullbanner.png')" }}>
      {/* Máscara preta semi-transparente para escurecer o fundo e dar um efeito embaçado chique (backdrop-blur-sm) */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Caixa central cinza do nosso formulário de Login */}
      <div className="relative w-full max-w-md bg-gray-900/70 border border-white/10 rounded-2xl px-10 py-12">
        
        {/* Topo com o Logotipo e Mensagem de Boas-vindas */}
        <div className="flex flex-col mb-2 items-center justify-center gap-x-2">
          {/* O link na logo nos leva de volta para a página inicial (/) */}
          <Link href="/">
            <Image src="/images/alphadevA.png" alt="Logo" width={50} height={60} />
          </Link>
          <h1 className="text-white text-3xl font-bold mb-1">Bem-vindo</h1>
          <p className="text-white/50 text-sm mb-2">Faça login para continuar</p>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          
          {/* Se a caixinha de 'erro' tiver algum texto dentro, desenha esse parágrafo em vermelho! */}
          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          {/* Campo de digitar o E-mail */}
          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">Email</p>
            <input
              value={form.email}
              // Quando o usuário digita (onChange), a gente atualiza a caixinha 'form' com o novo e-mail.
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="@email.com"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-600 transition-all"
            />
          </div>

          {/* Campo de digitar a Senha */}
          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">Senha</p>
            <input
              value={form.senha}
              // Atualiza a senha na memória conforme a pessoa digita.
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              type="password"
              placeholder="••••••••"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-600 transition-all"
            />
          </div>

          {/* Botão de Entrar que envia o formulário */}
          <button type="submit" className="bg-violet-700 cursor-pointer text-white text-sm font-bold uppercase py-3 rounded-sm hover:bg-violet-600 transition-all mt-2">
            entrar
          </button>
        </form>

        {/* Linha separadora bonitinha */}
        <div className="flex items-center gap-x-4 my-6">
          <div className="flex-1 h-[0.5px] bg-white/10" />
          <span className="text-white/30 text-xs">ou</span>
          <div className="flex-1 h-[0.5px] bg-white/10" />
        </div>

        {/* Texto e Link para quem não tem conta se cadastrar */}
        <p className="text-center text-white/50 text-sm">
          Não possui conta?{" "}
          <Link href="/cadastro" className="text-violet-600 hover:text-violet-500">
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  );
}