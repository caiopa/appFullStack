import { ProductWithTotalPrice } from "@/helpers/products";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";


interface ProductItemProps {
  product: ProductWithTotalPrice;
}

function ProductItem({product}: ProductItemProps) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="flex bg-accent rounded-lg h-[170px] w-full items-center justify-center relative">
          <Image 
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          src={product.imageUrls[0]}
          alt={product.name} 
          width={0} height={0} sizes="100vw" 
          style={{
            objectFit: "contain",
          }}
          />

          {
            product.discountPercentage > 0 && (
              <Badge className="absolute top-3 left-3 px-2 py-[2px]">
              <ArrowDownIcon size={14}/> {product.discountPercentage}%
              </Badge>
            )
          }
        </div>

        <div className="flex flex-col gap-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{product.name}</p>

          <div className="flex items-center gap-2 ">
            {product.discountPercentage > 0 ? (
              <>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                  R$ {product.totalPrice.toFixed(2)}
                </p>

                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                  R$ {Number(product.basePrice).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                R$ {product.basePrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>        
      </div>
    </Link>
  );
}

export default ProductItem;