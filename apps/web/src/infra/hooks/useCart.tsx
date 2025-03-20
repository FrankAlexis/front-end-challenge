import { useCartStore } from '@/infra/store/cartStore'
import { useMemo } from 'react'

export const useCart = () => {
  const state = useCartStore()
  const counts = useMemo(
    () =>
      state.cart.reduce(
        (acc, item) => ({
          cartItemCount: acc.cartItemCount + item.quantity,
          total: acc.total + item.price * item.quantity,
        }),
        {
          total: 0,
          cartItemCount: 0,
        }
      ),
    [state.cart]
  )

  const getProductQuantityInCart = (productId: number) => {
    const cartItem = state.cart.find((item) => item.id === productId)
    return cartItem ? cartItem.quantity : 0
  }

  return {
    ...state,
    ...counts,
    getProductQuantityInCart,
  }
}
