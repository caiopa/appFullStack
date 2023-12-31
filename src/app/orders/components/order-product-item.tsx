import { computedTotalPrice } from "@/helpers/products";
import { Prisma } from "@prisma/client";
import Image from 'next/image'


interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true
    }
  }>
}

const OrderProductItem = ( { orderProduct }: OrderProductItemProps ) => {
  const productWithTotalPrice = computedTotalPrice(orderProduct.product)

  return ( 
    <div className="flex flex-items gap-4">

      <div className="flex h-[77px] w-[100px] items-center justify-center rounded-lg bg-accent">
        <Image 
        src={orderProduct.product.imageUrls[0]} 
        alt={orderProduct.product.name} 
        width={0} height={0} 
        sizes="100vw"
        className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"      
        />


      </div>

      <div className="flex flex-col gap-1 w-full">

        <div className="flex w-full bg-accent px-3 py-1 rounded-md">
            <p className="text-[10px] font-semibold">
              Vendido e entregue por: <span>
                CPA Store
              </span>
            </p>
        </div>
        <p className="text-xs">{orderProduct.product.name}</p>

        <div className="flex items-center justify-between gap-1"> 
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">
              R$ {productWithTotalPrice.totalPrice.toFixed(2)}
            </p>
            {
              productWithTotalPrice.discountPercentage > 0 && (
                <p className="text-xs opacity-60 line-through">
                  {productWithTotalPrice.basePrice.toFixed(2)}
                </p>
              )}
          </div>
          <p className="text-xs opacity-60">Qntd: {orderProduct.quantity}</p>
        </div>

      </div>

    </div>
   );
}
 
export default OrderProductItem;