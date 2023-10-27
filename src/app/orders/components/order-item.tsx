import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computedTotalPrice } from "@/helpers/products";
import { getOrderStatus } from "./helpers/status";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  }>
}

const OrderItem = ({order}: OrderItemProps) => {

  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, product) => {
      const productWithTotalPrice = computedTotalPrice( product.product);

      return acc + productWithTotalPrice.totalPrice * product.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscounts = subtotal - total;

  return ( 
    <Card className="px-5">
      <Accordion type='single' className='w-full' collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="uppercase font-bold text-sm">
              Pedido com {order.orderProducts.length} produto(s)
              </p>
              <p className="text-xs opacity-60">Feito em {format(new Date(order.createdAt), "dd/MM/yyyy 'ás' HH:mm")}</p>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-primary">{getOrderStatus(order.status)}</p>
                </div>
                <div>
                  <p className="font-bold">Data</p>
                  <p className="opacity-60">{format(new Date(order.createdAt), 'dd/MM/yyyy')}</p>
                </div>
                <div>
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>
              {
                order.orderProducts.map((orderProduct) => (
                  <OrderProductItem key={orderProduct.id} orderProduct={orderProduct} />
                ))
              }
              <div className="flex flex-col gap-1 text-xs">

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>SubTotal</p>
                  <p>R$ {subtotal.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Entrega</p>
                  <p>GRÁTIS </p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Descontos</p>
                  <p className="text-xs opacity-60 line-through">R$ {totalDiscounts.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Total</p>
                  <p>R$ {total.toFixed(2)}</p>
                </div>

              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
   );
}
 
export default OrderItem;
