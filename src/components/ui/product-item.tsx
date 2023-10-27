import { ProductWithTotalPrice } from "@/helpers/products";
import Image from "next/image";
import { Badge } from "../../../badge";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
  className?: string;
}

function ProductItem({product, className}: ProductItemProps) {
  return (
    <Link href={`/product/${product.slug}`} 
    className={cn("flex min-w-[156px] flex-col gap-4", className)}>
      <div className="flex flex-col gap-4">
        <div className="flex bg-accent rounded-lg h-[170px] w-full items-center justify-center relative">
          <Image 
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          src={product.imageUrls[0]}
          alt={product.name} 
          width={0} height={0} sizes="100vw" 
         
          />

        {product.discountPercentage > 0 && (
          <DiscountBadge className="absolute left-3 top-3">
            {product.discountPercentage}
          </DiscountBadge>
        )}  
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