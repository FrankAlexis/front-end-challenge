import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore } from "@/domain";
import { loadInitialProducts } from "./mocks";
import { CartUseCase } from "@/infra/use-cases/cart.use-case";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      products: loadInitialProducts(),
      cart: [],
      invoices: [],

      initializeProducts: (initialProducts) => {
        set({ products: initialProducts });
      },
      addToCart: (product) => {
        CartUseCase.add({ get, set }, product);
      },
      removeFromCart: (productId) => {
        CartUseCase.remove({ get, set }, productId);
      },
      updateCartItemQuantity: (productId, quantity) => {
        CartUseCase.updateQuantity({ get, set }, productId, quantity);
      },
      clearCart: () => {
        CartUseCase.clear({ get, set });
      },
      generateInvoice: (shippingInfo) => {
        return CartUseCase.generateInvoice({ get, set }, shippingInfo);
      },
    }),
    {
      name: "cart-storage"
    }
  )
);




