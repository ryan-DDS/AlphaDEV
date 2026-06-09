import Link from "next/link";
import Image from "next/image";
import { UsersRound } from "lucide-react";

export default function Learning() {
  return (
    <section className="flex" >
      <div className="px-90 bg-gray-100 h-27 w-full">
        <div className="flex items-start mt-0">
          <h2 className="text-xl font-bold">
            Conhece a comunidade AlphaDev?{" "}
            <span className="font-normal text-gray-900">
              Participe de desafios, eventos, mentorias e networking com outros
              desenvolvedores.
            </span>
          </h2>
          <Link
            href="#"
            className="justify-center items-center px-6 py-2 bg-(--color-1) cursor-pointer text-white rounded-[50px] hover:bg-(--color-1)/70 transition-all duration-300 flex gap-1.5"
          >
            Comunidade
            <UsersRound className="color-white w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
