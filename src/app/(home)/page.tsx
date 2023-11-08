

import Categories from "./componentes/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import SectionTitle from "../../components/ui/section-title";
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
  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      }
    }
  })
  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <PromoBanner
        src="/banner-ofertas.png"
        className="hidden md:inline md:max-h-[300px]"
        alt="Até 55% de desconto" />

        <PromoBanner
        src="/banner-home01.png"
        className="md:hidden"
        alt="Até 55% de desconto" />
      </div>

      <div className="px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle>Ofertas
         </SectionTitle>
        <ProductList products={deals} />
      </div>

      <div className="md:grid md:grid-cols-2">
        <PromoBanner 
        src="/banner-mouses.png" 
        alt="Até 55% de desconto em mouses" 
        className="md:max-h-[250px]"
        />
        <div>
        <PromoBanner 
        src="/banner-fones.png" 
        alt="Até 20% de desconto em Fones"
        className="md:max-h-[250px] hidden md:inline"
        
        />
      </div>

       </div>

      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <div>
        <PromoBanner 
        src="/banner-fones.png" 
        alt="Até 20% de desconto em Fones"
        className="md:max-h-[250px] md:hidden"
        
        />
      </div>
      <div className="hidden md:inline">
        <PromoBanner 
        src="/banner-fretegrátis.png" 
        alt="Até 20% de desconto em Fones"
        className="md:max-h-[250px]"
        
        />
      </div>

      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>



    </div>

    
  );
}
 