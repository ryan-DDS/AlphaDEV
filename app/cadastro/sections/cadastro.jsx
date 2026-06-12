"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // 1. Importação para navegação performática

export default function Cadastro() {
  const router = useRouter(); // 2. Inicializando o roteador do Next.js
  const [form, setForm] = useState({
    nome: "",
    perfil: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    // 3. Validação de internet ANTES de tentar fazer a requisição
    if (!navigator.onLine) {
      alert("Sem conexão com a internet. Verifique sua rede e tente novamente.");
      return;
    }

    // validação de campos vazios
    if (!form.nome || !form.perfil || !form.email || !form.senha) {
      alert("Preencha todos os campos!");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) return alert("Erro ao cadastrar");
      
      alert("Cadastro realizado com sucesso!");
      router.push("/login"); // 4. Navegação suave sem dar refresh na página
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/fullbanner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* card formulário */}
      <div className="relative w-full max-w-md bg-gray-900/70 border border-white/10 rounded-2xl px-10 py-12">
        {/* logo */}
        <div className="flex flex-col mb-2 items-center justify-center gap-x-2">
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

        {/* formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          {/* nome */}
          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">
              Nome
            </p>
            <input
              value={form.nome} // Adicionado value controlado
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              type="text"
              placeholder="nome"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-600 transition-all duration-300"
            />
          </div>

          {/* perfil */}
          <div className="flex flex-col gap-y-2">
            <p className="text-white/70 text-xs tracking-widest uppercase">
              Perfil
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, perfil: "aluno" })}
                className={`px-4 py-3 cursor-pointer rounded-sm text-sm font-medium transition-all duration-300 border ${
                  form.perfil === "aluno"
                    ? "bg-violet-600 border-violet-600 text-white"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                Aluno
              </button>

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

          {/* email */}
          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">
              Email
            </p>
            <input
              value={form.email} // Adicionado value controlado
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="@email.com"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-600 transition-all duration-300"
            />
          </div>

          {/* senha */}
          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">
              Senha
            </p>
            <input
              value={form.senha} // Adicionado value controlado
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              type="password"
              placeholder="senha"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-600 transition-all duration-300"
            />
          </div>

          {/* confirmar senha */}
          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">
              Confirmar Senha
            </p>
            <input
              value={form.confirmarSenha} // Adicionado value controlado
              onChange={(e) =>
                setForm({ ...form, confirmarSenha: e.target.value })
              }
              type="password"
              placeholder="confirmar senha"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-600 transition-all duration-300"
            />
          </div>

          {/* botao */}
          <button
            type="submit"
            className="bg-violet-700 cursor-pointer text-white text-sm font-bold uppercase tracking-widest py-3 rounded-sm hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 mt-2"
          >
            cadastrar-se
          </button>
        </form>

        {/* linha */}
        <div className="flex items-center gap-x-4 my-6">
          <div className="flex-1 h-[0.5px] bg-white/10" />
          <span className="text-white/30 text-xs">ou</span>
          <div className="flex-1 h-[0.5px] bg-white/10" />
        </div>

        {/* login */}
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