import { Invoice, ShippingFormData, Product } from "@/domain";

export interface CartItem extends Product {
    quantity: number;
}

type CartStoreActions = {
    initializeProducts: (initialProducts: Product[]) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateCartItemQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    generateInvoice: (shippingInfo: ShippingFormData) => Invoice;
}

type CartStoreState = {
    products: Product[];
    cart: CartItem[];
    invoices: Invoice[];
}

export type CartStore = CartStoreState & CartStoreActions