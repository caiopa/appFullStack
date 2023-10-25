import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct
}

const CartItem = ({product}: CartItemProps) => {
  const {decreaseProductQuantity, increaseProductQuantity, removeProductFromCart} = useContext(CartContext);

  const handleDecreaseProductQuantity = () => {
    decreaseProductQuantity(product.id);
  }

  const handleIncreaseProductQuantity = () => {
    increaseProductQuantity(product.id);
  }
  const handleRemoveProductQuantity = () => {
    removeProductFromCart(product.id);
  }

  return ( 
    <div className="flex item-center justify-between">
      <div className="flex item-center gap-4">

      </div>
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
        <Image 
          src={product.imageUrls[0]} 
          alt={product.name} 
          width={0} height={0} 
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]" 
        />
      </div>
      <div className="flex flex-col">

        <p className="text-xs">{product.name}</p>

        <div className="flex items-center gap-2">
          <p className="text-xs font-bold">R$ {Number(product.totalPrice).toFixed(2)}</p>
        </div>
        {
          product.discountPercentage > 0 && (
            <p className="text-xs line-through opacity-75">R$ {Number(product.basePrice).toFixed(2)}</p>
          )
        }

        <div className="flex items-center gap-1">
          <Button
            onClick={handleDecreaseProductQuantity}
            size="icon"
            variant="outline"
            className="h-8 w-8 "
          >
            <ArrowLeftIcon size={16} />
          </Button>

          <span className="text-xs">{product.quantity}</span>

          <Button
            onClick={handleIncreaseProductQuantity}
            size="icon"
            variant="outline"
            className="h-8 w-8 "
          >
            <ArrowRightIcon size={16} />
          </Button>
        </div>
      </div>

      <Button
        size="icon"
        variant="outline"
        onClick={handleRemoveProductQuantity}
      >
        <TrashIcon size={16} />
      </Button>
     
    </div>
   );
}
 
export default CartItem;