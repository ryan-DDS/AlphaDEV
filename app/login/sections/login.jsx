"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState(""); // 1. Corrigido: declarado estado de erro

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(""); // Limpa o erro ao tentar de novo

    if (!navigator.onLine) {
      alert("Sem conexão com a internet.");
      return;
    }

    if (!form.email || !form.senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    try {
      // 2. Corrigido: agora aponta para /api/login
      const res = await fetch("/api/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const dados = await res.json();

      if (!res.ok) {
        throw new Error(dados.error || "Erro ao fazer login");
      }

      router.push("/dashboard");
      router.refresh(); 

    } catch (err) {
      setErro(err.message); // Agora funciona porque declaramos o useState acima
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/fullbanner.png')" }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative w-full max-w-md bg-gray-900/70 border border-white/10 rounded-2xl px-10 py-12">
        <div className="flex flex-col mb-2 items-center justify-center gap-x-2">
          <Link href="/">
            <Image src="/images/alphadevA.png" alt="Logo" width={50} height={60} />
          </Link>
          <h1 className="text-white text-3xl font-bold mb-1">Bem-vindo</h1>
          <p className="text-white/50 text-sm mb-2">Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          {/* Mostra o erro se existir */}
          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">Email</p>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="@email.com"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-600 transition-all"
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <p className="text-white/70 text-xs tracking-widest uppercase">Senha</p>
            <input
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              type="password"
              placeholder="••••••••"
              className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-600 transition-all"
            />
          </div>

          <button type="submit" className="bg-violet-700 text-white text-sm font-bold uppercase py-3 rounded-sm hover:bg-violet-600 transition-all mt-2">
            entrar
          </button>
        </form>

        <div className="flex items-center gap-x-4 my-6">
          <div className="flex-1 h-[0.5px] bg-white/10" />
          <span className="text-white/30 text-xs">ou</span>
          <div className="flex-1 h-[0.5px] bg-white/10" />
        </div>

        <p className="text-center text-white/50 text-sm">
          Não possui conta?{" "}
          {/* 3. Corrigido: Link aponta para /cadastro */}
          <Link href="/cadastro" className="text-violet-600 hover:text-violet-500">
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  );
}