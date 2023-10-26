import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computedTotalPrice } from "@/helpers/products";
import { Separator } from "./separator";

const Cart = () => {
  const { products, total, subTotal, totalDiscount } = useContext(CartContext)
  return ( 
    <div className="flex flex-col gap-8">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]"
      variant={"outline"}>
        <ShoppingCartIcon size={16}/>
        Carrinho
      </Badge>

      <div className="flex flex-col gap-5">
      {
        products.length > 0 ? (
          products.map((product) => (
            <h1 key={product.name}>
              <CartItem 
              key={product.name}
              product={computedTotalPrice(product) as any} />
            </h1>
          ))
        ) : (
          <p className="text-center font-semibold">Seu carrinho esta vazio</p>
        )
      }
      </div>

      <div className="flex flex-col gap-3">
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Subtotal</p>
          <p>R$ {subTotal.toFixed(2)}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Descontos</p>
          <p className="line-through">R$ {totalDiscount.toFixed(2)}</p>
          
        </div>
        <Separator />
        <div className="flex line items-center justify-between text-sm font-bold">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
   );
}
 
export default Cart;