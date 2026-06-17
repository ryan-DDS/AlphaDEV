// Importamos a fonte "Poppins" da biblioteca do tio Google Fonts.
// É tipo escolher uma letra bem bonita para escrever nossa redação da escola!
import { Poppins } from "next/font/google";

// Importamos a nossa roupinha padrão de estilos (CSS) para todo o site.
// Sem isso aqui, a página ia ficar toda sem cor e feia, como um papel em branco rabiscado.
import "./globals.css";

// Criamos um configurador da fonte Poppins.
// Definimos o alfabeto (subsets) e os pesos das letras (se é fininha ou bem gordinha/negrito).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Essa é a moldura principal de todo o nosso site (RootLayout).
// Ela recebe de presente os "children" (que são as outras páginas que vamos colocar dentro dessa moldura).
export default function RootLayout({ children }) {
  return (
    // A tag <html> avisa ao navegador que isso é um site, escrito em português do Brasil (lang="pt-BR")!
    <html lang="pt-BR">
      {/* O <body> é o corpinho do site onde tudo acontece.
          Colocamos a roupinha de fonte poppins nele usando 'poppins.className' */}
      <body className={poppins.className}>
        {/* Aqui dentro a gente enfia as outras páginas (children) que o usuário quer ver! */}
        {children}
      </body>
    </html>
  );
}