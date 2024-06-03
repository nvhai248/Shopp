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

// Define the interfaces
export interface OrderDetailItem {
  price: number;
  quantity: number;
  product: {
    id: string;
    name: string;
    avatar: string;
    rate: number;
  };
}

export interface Order {
  id: string;
  isPaid: boolean;
  totalPrice: number;
  priceToPay: number;
  reducePrice: number;
  paymentMethod: string;
  status: string;
  items?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PagingOrder {
  page: number;
  limit: number;
  total: number;
  data: Order[];
}
