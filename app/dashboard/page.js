// Importamos o gerenciador de cookies do Next.js para ler a gaveta de cookies do navegador do usuário.
import { cookies } from "next/headers"; 

// Importamos a função que verifica se o crachá (token) do usuário é de verdade.
import { verificarToken } from "@/lib/auth";

// Importamos a função "redirect", que é tipo um portal de teletransporte para mandar o usuário para outra página.
import { redirect } from "next/navigation";

// Importamos os três tipos de telas de controle (dashboards) que temos: Aluno, Professor e Admin.
import DashboardAluno from "./components/dashboardaluno";
import DashboardProfessor from "./components/dashboardprofessor";
import DashboardAdmin from "./components/dashboardadmin"; 

// Esta é a função principal que fabrica a página de Dashboard.
// Como ela usa "async" e roda diretamente no servidor, ela consegue olhar os cookies de forma super segura!
export default async function DashboardPage() {
  // Abrimos a gavetinha de cookies do navegador.
  const cookieStore = await cookies();
  // Pegamos o valor do cookie chamado "token" (nosso crachá).
  const token = cookieStore.get("token")?.value;

  // Se o usuário não tiver o crachá (token), teletransportamos ele de volta para a tela de login!
  if (!token) {
    redirect("/login");
  }

  // Se tiver um crachá, a gente tenta ler o que está escrito dentro dele.
  const dadosUsuario = verificarToken(token);

  // Se o crachá for falso ou estiver vencido, mandamos ele de volta para o login para fazer a identificação de novo.
  if (!dadosUsuario) {
    redirect("/login");
  }

  // SEGREDO DO ADMIN: Se no crachá estiver escrito que o cargo (perfil) dele é "admin",
  // a gente entrega o controle mestre (DashboardAdmin) e passa os dados dele de presente.
  if (dadosUsuario.perfil === "admin") {
    return <DashboardAdmin user={dadosUsuario} />;
  }

  // Se o cargo dele for "professor", a gente mostra a tela do professor (DashboardProfessor).
  if (dadosUsuario.perfil === "professor") {
    return <DashboardProfessor user={dadosUsuario} />;
  }

  // Se não for admin nem professor, significa que é um Aluno!
  // Então a gente mostra a tela de Aluno padrão (DashboardAluno).
  return <DashboardAluno user={dadosUsuario} />;
}