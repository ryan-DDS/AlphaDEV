// Importamos o brinquedo "Link" do Next.js.
// Esse brinquedo serve para levar o usuário para outra página sem a tela ficar piscando/recarregando.
import Link from "next/link"

// Esta é a função principal que fabrica o nosso botão mágico!
// Recebe presentes (parâmetros): children (o texto/ícone dentro do botão), onClick (a ação ao clicar),
// href (o link para onde ele aponta) e className (estilos extras de roupa).
export default function Button({ children, onClick, href, className = "" }) {
  // Criamos uma listona de estilos (classes CSS) que deixam o botão bonito, com cor roxa ao passar o mouse e bordas redondinhas.
  const classes = `flex items-center gap-1 hover:text-purple-400 font-medium transition-all duration-300 cursor-pointer bg-transparent p-2 border border-transparent hover:bg-gray-700 rounded-[50px] hover:border hover:border-purple-400 ${className}`

  // Se o botão tiver um endereço para ir (href), ele se transforma em um Link!
  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  // Se não tiver endereço, ele é apenas um botão comum que executa uma ação (onClick) quando a criança clica nele.
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}