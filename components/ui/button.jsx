import Link from "next/link"

export default function Button({ children, onClick, href, className = "" }) {
  const classes = `flex items-center gap-1 hover:text-purple-400 font-medium transition-all duration-300 cursor-pointer bg-transparent p-2 border border-transparent hover:bg-gray-700 rounded-[50px] hover:border hover:border-purple-400 ${className}`

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}