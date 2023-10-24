
import { useSession } from "next-auth/react"
import Image from "next/image"
import Categories from "./componentes/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./componentes/product-list";
import SectionTitle from "./componentes/section-title";
import PromoBanner from "./componentes/promo-banner";
export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
    }
  })
  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      }
    }
  })
  return (
    <div className="">
      <PromoBanner src="/banner-home01.png" alt="Até 55% de desconto" />

      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <SectionTitle>Ofertas
         </SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner src="/banner-mouses.png" alt="Até 55% de desconto em mouses" />

      <div className="mt-8">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
    </div>

    
  );
}
 