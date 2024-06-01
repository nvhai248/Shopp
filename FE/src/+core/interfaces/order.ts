import { PAYMENT_METHOD } from "../enums";

// graphql/interfaces.js
export interface OrderItem {
  productId: string;
  price: number;
  quantity: number;
}

export interface CreateOrderInput {
  contactId: string;
  promotionId?: string;
  isPaid: boolean;
  paymentMethod: PAYMENT_METHOD;
  items: OrderItem[];
}
