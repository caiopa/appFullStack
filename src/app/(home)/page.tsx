
import { useSession } from "next-auth/react"
import Image from "next/image"
import Categories from "./componentes/categories";
export default function Home() {
  return (
    <div className="p-5">
      <Image src="/banner-home01.png" alt="Até 55% de desconto" width={0} height={0} className="h-auto w-full" sizes="100vw" />

      <div className="mt-8">
        <Categories />

      </div>
    </div>
  );
}
 