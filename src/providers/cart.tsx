'use client'
import { ProductWithTotalPrice } from "@/helpers/products";
import { createContext, useEffect, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number,

}

interface ICartContext {
  products: CartProduct[]
  cartTotalPrice: number,
  cartBasePrice: number,
  cartTotalDiscount: number,
  total: number,
  subTotal: number,
  totalDiscount: number
  addProductToCart: (product: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void

}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {}
})

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [products, setProducts] = useState<CartProduct[]>([])

 useEffect(() => {
  setProducts(
    JSON.parse(localStorage.getItem("@cpa-store/cart-products") || "[]"),
    );
  }, []);
  
useEffect(() => {
  localStorage.setItem('@cpa-store/cart-products', JSON.stringify(products))
}, [products])


  // total sem descontos
  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity
    }, 0)
  }, [products])

  // total com descontos
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.totalPrice) * product.quantity
    }, 0)
  }, [products])
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


  const totalDiscount = total - subTotal

  const decreaseProductQuantity = (productId: string) => {
    setProducts(prev => prev.map(cartProduct => {
      if(cartProduct.id === productId) {
        return {
          ...cartProduct, 
          quantity: cartProduct.quantity - 1
        }
      }
      return cartProduct
    }).filter(cartProduct => cartProduct.quantity > 0))
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts(prev => prev.map(cartProduct => {
      if(cartProduct.id === productId) {
        return {
          ...cartProduct, 
          quantity: cartProduct.quantity + 1
        }
      }
      return cartProduct
    }))
  }

  const removeProductFromCart = (productId: string) => {
    setProducts(prev => prev.filter(cartProduct => cartProduct.id !== productId))
  }

  

  return (
    <CartContext.Provider value={{
      products,
      total,
      subTotal,
      totalDiscount,
      addProductToCart, 
      decreaseProductQuantity,
      increaseProductQuantity,
      removeProductFromCart,
      cartTotalPrice: 0, 
      cartBasePrice: 0, 
      cartTotalDiscount: 0
      }}
    >
        {children}
    </CartContext.Provider>
  )
}