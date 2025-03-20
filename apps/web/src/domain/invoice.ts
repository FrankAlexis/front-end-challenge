import { CartItem, ShippingFormData } from "@/domain";

export interface Invoice {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingInfo: ShippingFormData;
}
