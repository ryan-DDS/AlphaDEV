import Image from "next/image";
import Link from "next/link";

export default function Header() {
return (
    <header className="header flex space-between items-center h-16 bg-white text-white/70">
    <Link href="/hero">
    <div className="logo flex items-center gap-2">
        
        <div className="nome_da_logo">
            <h1 className="text-xl font-bold text-white/50">Alpha</h1>
            <h1 className="text-xl font-semibold text-sky-500">DEV</h1>
        </div>
        <Image src="/images/seta_logo.png" alt="Logo" width={50} height={20} />
    </div>
    </Link>
    </header>
);
}
