import ProductItem from "@/components/ui/product-item";
import { computedTotalPrice } from "@/helpers/products";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}
const ProductList = ({products}: ProductListProps) => {
  return ( 
    <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {
        products.map((product) => (
          <ProductItem key={product.id} product={computedTotalPrice(product)} />
        ))
      }
    </div>
   );
}
 
export default ProductList;