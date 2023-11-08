export interface Item{
  name: string;
  price: number;
  quantify: number;
}

export interface Order {
  orderId: string;
  creationDate: string;
  cancellationDate: string;
  clientName: string;
  items: Item[];
  subtotal?: number;
  tax?: number;
  total?: number;
}

export interface PayloadGetOrders {
  searchType: 'cancellationDate' | 'creationDate' | null;
  initialDate: Date | null;
  finalDate: Date | null;
}
