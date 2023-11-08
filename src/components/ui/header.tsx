'use client'
import { MenuIcon, ShoppingCartIcon, LogInIcon, PercentCircle, ListOrderedIcon, HomeIcon, PackageSearchIcon, UserCheck, UserIcon, LogOut } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "./avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from './separator';
import Link from "next/link";
import Cart from "./cart";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
    const { status, data } = useSession()
    const { products } = useContext(CartContext);

    const cartQuantityItems = products.length;
    const handleLoginClick = async () => {
        await signIn()
    }

    const handleLogoutClick = async () => {
        await signOut()
    }
    return ( 
        <Card className="flex justify-between p-[1.875rem] items-center">
          <div className="md:hidden">          
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
           
           <SheetContent side="left" className="w-[21.875rem]">
             <SheetHeader className="text-left text-lg font-semibold">Menu</SheetHeader> 

             {
                status === 'authenticated' && data?.user && (
                   <div className="flex flex-col">
                    <div className="py-4 flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback>
                            {data.user.name?.[0].toUpperCase()}
                        </AvatarFallback>
                    
                        { data.user.image && <AvatarImage src={data.user.image!}/>}

                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-medium">{data.user.name}</p>
                        <p className="text-sm opacity-75">Boas compras !</p>

                      </div>
                        
                    </div>
                    <Separator/>
                  </div>
                )
            }


             <div className="mt-4 flex flex-col gap-2">

                {
                  status === 'unauthenticated' &&
                    <Button onClick={handleLoginClick} variant="outline" className="w-full justify-start gap-2">
                    <LogInIcon size={16} />
                        Fazer login
                    </Button>
                }

                {
                  status === 'authenticated' &&
                    <Button onClick={handleLogoutClick} variant="outline" className="w-full justify-start gap-2">
                    <LogInIcon size={16} />
                        Fazer logout
                    </Button>
                }

                <SheetClose asChild>
                  <Link href="/">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <HomeIcon size={16} />
                      Início
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/orders">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <PackageSearchIcon size={16} />
                      Meus Pedidos
                    </Button>
                  </Link>
                </SheetClose>
                
                <SheetClose asChild>
                  <Link href="/deals">
                    <Button 
                    variant="outline" className="w-full justify-start gap-2">
                      <PercentCircle size={16} />
                    Ofertas
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/catalog">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <ListOrderedIcon size={16} />
                      Catálogo
                    </Button>
                  </Link>
                </SheetClose>
             </div>
           </SheetContent>

          </Sheet>
          </div>  

          <Link href="/">
            <h1 className="font-semibold text-lg">
              <span className="text-primary">CPA</span> Store
            </h1>
          </Link>

          <div className="md:flex hidden gap-3">
            <Link href="/">
              <Button variant="outline" className="w-full justify-start gap-2 border-none">
                <HomeIcon size={16} />
                Início
              </Button>
            </Link>

            <Link href="/orders">
              <Button variant="outline" className="w-full justify-start gap-2 border-none">
                <PackageSearchIcon size={16} />
                 Meus Pedidos
              </Button>
            </Link>

            <Link href="/deals">     
              <Button variant="outline" className="w-full justify-start gap-2 border-none">
                <PercentCircle size={16} />
                Ofertas
              </Button>
            </Link>

           
          </div>
          <div className="md:hidden">

          
               <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="relative">
                    {cartQuantityItems > 0 && (
                      <span className="absolute right-[calc(-1.25rem/2)] top-[calc(-1.25rem/2)] flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-sm font-bold">
                        {cartQuantityItems}
                      </span>
                    )}
                    <ShoppingCartIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[350px]">
                  <Cart />
                </SheetContent>
               </Sheet>
          </div>
          <div className="md:flex hidden justify-center items-center gap-3">
               <div>
                  {
                   status === 'unauthenticated' &&
                      <Button onClick={handleLoginClick} variant="outline" className="w-full justify-start gap-2">
                      <UserIcon size={16} />
                      Fazer Login
                      </Button>
                  }

                  {                  
                    status === 'authenticated' && data?.user && (
                       <div className="flex flex-col">
                        <div className="py-4 flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>
                                <UserIcon size={14} />
                            </AvatarFallback>
                        
                            { 
                            data.user.image && 
                            <DropdownMenu>
                              <DropdownMenuTrigger><AvatarImage  src={data.user.image!} /></DropdownMenuTrigger>
                              <DropdownMenuContent>
                               <DropdownMenuItem>
                                <Button onClick={handleLogoutClick} variant="outline" className="w-full justify-start gap-2">
                                <LogInIcon size={16} />
                                    Fazer logout
                                </Button>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                              
                            </DropdownMenu>
                            }
    
                          </Avatar>
                            
                        </div>
 
                      </div>
                    )
                  }
               </div>
               <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="relative">
                    {cartQuantityItems > 0 && (
                      <span className="absolute right-[calc(-1.25rem/2)] top-[calc(-1.25rem/2)] flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-sm font-bold">
                        {cartQuantityItems}
                      </span>
                    )}
                    <ShoppingCartIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[350px]">
                  <Cart />
                </SheetContent>
               </Sheet>
          </div>
              
        </Card>
     );
}
 
export default Header;