import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Badge } from "../../../badge";
import { PackageSearchIcon } from "lucide-react";
import { prismaClient } from "@/lib/prisma";
import OrderItem from "./components/order-item";

export const dynamic = "force-dynamic";
const OrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Acesso Negado!</h2>
        <p className="text-sm opacity-60">Faça login para ver seus pedidos</p>
      </div>
    );
    }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
  return ( 
    <div className="p-5">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]"
      variant={"outline"}>
        <PackageSearchIcon size={16}/>
        Meus Pedidos
      </Badge>

      <div className="flex flex-col gap-5 mt-5">
      {
        orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))
      }
      </div>
    </div>
   );
}
 
export default OrdersPage;