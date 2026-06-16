"use client";
import { useState, useEffect } from "react";

export default function DashboardProfessor({ user }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para manipular os dados
  const [idEdicao, setIdEdicao] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState("aluno");

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" }); // Redireciona para sua tela de login
  };

  const API_URL = "/api/usuarios";

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao carregar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarUsuarios(); }, []);

  // Lógica de Salvar (POST ou PUT)
  const handleSalvar = async (e) => {
    e.preventDefault();
    const method = idEdicao ? "PUT" : "POST";
    const url = idEdicao ? `${API_URL}/${idEdicao}` : API_URL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, perfil }),
    });

    setIdEdicao(null);
    setNome(""); setEmail("");
    carregarUsuarios();
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      {/* SEU DESIGN AQUI */}
      
      {/* Tabela simplificada: Apenas exibição e Edição */}
      {/* (Não inclua o botão de Excluir aqui) */}
      
      <table className="w-full">
        {/* ... headers ... */}
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => {
                  setIdEdicao(u.id);
                  setNome(u.nome);
                  setEmail(u.email);
                  setPerfil(u.perfil);
                }}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}