
import { useSession } from "next-auth/react"
import Image from "next/image"
import Categories from "./componentes/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./componentes/product-list";
export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
    }
  })
  return (
    <div className="">
      <Image src="/banner-home01.png" alt="Até 55% de desconto" width={0} height={0} className="h-auto w-full" sizes="100vw" />

      <div className="mt-8 px-5">
        <Categories />
      </div>
      
      <div className="mt-8">
        <ProductList products={deals} />
      </div>
    </div>
  );
}
 