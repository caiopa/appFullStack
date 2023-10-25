import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computedTotalPrice } from "@/helpers/products";

const Cart = () => {
  const { products } = useContext(CartContext)
  return ( 
    <div className="flex flex-col gap-8">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]"
      variant={"outline"}>
        <ShoppingCartIcon size={16}/>
        Carrinho
      </Badge>

      <div className="flex flex-col gap-5">
      {
        products.map((product) => (
          <h1 key={product.name}>
            <CartItem 
            key={product.name}
            product={computedTotalPrice(product) as any} />
          </h1>
        ))}
      </div>
    </div>
   );
}
 
export default Cart;