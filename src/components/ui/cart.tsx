import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "../../../badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computedTotalPrice } from "@/helpers/products";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "@/actions/order";
import { signIn, useSession } from "next-auth/react";

const Cart = () => {
  const { products, total, subTotal, totalDiscount } = useContext(CartContext)
  const {data} = useSession()
  
  const handleLoginClick = async () => {
    await signIn()
}
  const handleFinalizePurchase = async () => {
    if(!data?.user) {
      handleLoginClick()
    }
    const order = await createOrder(products, (data?.user as any).id)

    const checkout = await createCheckout(products, order.id);
    
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)



    stripe?.redirectToCheckout({
      sessionId: checkout.id
    })
  }

  return ( 
    <div className="flex flex-col gap-8 h-full">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]"
      variant={"outline"}>
        <ShoppingCartIcon size={16}/>
        Carrinho
      </Badge>

      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computedTotalPrice(product) as any}
                />
              ))
            ) : (
              <p className="text-center font-semibold">
                Carrinho vazio. Vamos às compras ?
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      {
        products.length > 0 && (
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
        <Button 
        onClick={handleFinalizePurchase}
        className="font-bold mt-7 uppercase">
          Finalizar compra
        </Button>
      </div>
        )
      }
    </div>
   );
}
 
export default Cart;