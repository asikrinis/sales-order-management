export interface Item{
  itemId: number;
  itemName: string;
  price: number;
  quantity: number;
}

export interface Order {
  orderId: string;
  creationDate: string;
  cancellationDate: string;
  clientName: string;
  items: Item[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface PayloadCreateOrder {
  clientName: string;
  items: Item[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface PayloadGetOrders {
  searchType: 'cancellationDate' | 'creationDate' | null;
  initialDate: Date | null;
  finalDate: Date | null;
}

export interface Product {
  itemId: number;
  itemName: string;
  price: number;
  brand: string;
  image: string;
  quantity?: number;
}
