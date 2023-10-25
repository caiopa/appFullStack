'use client'
import { ProductWithTotalPrice } from "@/helpers/products";
import { createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number,

}

interface ICartContext {
  products: CartProduct[]
  cartTotalPrice: number,
  cartBasePrice: number,
  cartTotalDiscount: number,
  addProductToCart: (product: CartProduct) => void

}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {}
})

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [products, setProducts] = useState<CartProduct[]>([])
  
  const addProductToCart = (product: CartProduct) => {
     
    const productAlreadyOnCart =  products.some((cartProduct) => cartProduct.id === product.id)

    if(productAlreadyOnCart) {
     setProducts(prev => prev.map((cartProduct) => {
        if(cartProduct.id === product.id) {
          return {...cartProduct, quantity: cartProduct.quantity + product.quantity}
        }
        return cartProduct
      }))
      return;
    }
    setProducts((prev) => [...prev, product]);
  }
  

  return (
    <CartContext.Provider value={{
      products,
      addProductToCart, 
      cartTotalPrice: 0, 
      cartBasePrice: 0, 
      cartTotalDiscount: 0
      }}
    >
        {children}
    </CartContext.Provider>
  )
}