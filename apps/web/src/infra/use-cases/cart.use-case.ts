import { Invoice, Product, CartStore, ShippingFormData } from "@/domain";
import { setInitialProducts } from "../store/mocks";

interface Params<T> {
    get: () => T;
    set: (state: T | ((state: T) => Partial<T>)) => void;
}

export class CartUseCase {
    static add({ get, set }: Params<CartStore>, product: Product) {
        const existingCartItem = get?.().cart.find(
            (item) => item.id === product.id
        );

        set((state) => {
            if (!existingCartItem) {
                return {
                    cart: [...state.cart, { ...product, quantity: 1 }]
                }
            }
            return {
                cart: state.cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
        });
    }



    static remove({ set }: Params<CartStore>, productId: number) {
        set((state) => {
            const cartItemIndex = state.cart.findIndex((item) => item.id === productId);

            if (cartItemIndex === -1) return { cart: state.cart };

            const cartItem = state.cart[cartItemIndex];

            if (cartItem.quantity > 1) {
                const updatedCart = [...state.cart];
                updatedCart[cartItemIndex] = { ...cartItem, quantity: cartItem.quantity - 1 };
                return { cart: updatedCart };
            }

            return {
                cart: state.cart.filter((item) => item.id !== productId),
            };

        });
    }

    static updateQuantity({ set }: Params<CartStore>, productId: number, quantity: number) {
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            ),
        }));
    }

    static generateInvoice({ get, set }: Params<CartStore>, shippingInfo: ShippingFormData) {
        const cart = get().cart;

        const subtotal = cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const tax = cart.reduce(
            (total, item) => total + item.price * item.quantity * item.tax,
            0
        );
        const total = subtotal + tax;

        const invoice: Invoice = {
            id: new Date().getTime().toString(),
            date: new Date().toISOString(),
            items: cart,
            subtotal,
            tax,
            total,
            shippingInfo,
        };

        const products = CartUseCase.updateStockInStorage({ get, set });

        set((state) => ({
            ...state,
            invoices: [...state.invoices, invoice],
            products,
            cart: [],
        }));


        return invoice;
    }

    static updateStockInStorage({ get }: Params<CartStore>) {
        const cart = get().cart;
        const products = get().products.map((item) => {
            const product = cart.find((p) => p.id === item.id);
            if (product) {
                return {
                    ...item,
                    stock: item.stock - product.quantity
                };
            }
            return item;
        });
        setInitialProducts(products);
        return products;
    }

    static clear({ set }: Params<CartStore>) {
        set((state) => ({
            ...state,
            cart: []
        }));
    }
}
