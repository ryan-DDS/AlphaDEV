import { cookies } from "next/headers"; 
import { verificarToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardAluno from "./components/dashboardaluno";
import DashboardProfessor from "./components/dashboardprofessor";
import DashboardAdmin from "./components/dashboardadmin"; // 1. Importado o novo componente do admin

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const dadosUsuario = verificarToken(token);

  if (!dadosUsuario) {
    redirect("/login");
  }

  // 2. SEGREDO DO ADMIN: Se no banco o perfil for 'admin', carrega a tela master
  if (dadosUsuario.perfil === "admin") {
    return <DashboardAdmin user={dadosUsuario} />;
  }

  if (dadosUsuario.perfil === "professor") {
    return <DashboardProfessor user={dadosUsuario} />;
  }

  // Se não for admin nem professor, cai no aluno
  return <DashboardAluno user={dadosUsuario} />;
}