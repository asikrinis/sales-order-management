import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';
import { Item, Order, PayloadCreateOrder, PayloadGetOrders, Product } from '../interfaces/order.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private products: Product[] = [
    {
      "itemId": 23455,
      "itemName": "Gorra CK",
      "price": 500.00,
      "brand": "CK",
      "image": "../assets/images/gorra_ck.png",
      quantity: 0
  },
  {
      "itemId": 1109391120,
      "itemName": "Lente solar unisex Ray Ban",
      "price": 1295,
      "brand": "Ray Ban",
      "image": "../assets/images/lentes_ray_ban.png",
      quantity: 0
  },
  {
      "itemId": 1132437045,
      "itemName": "Sudadera Tommy Hilfiger para mujer",
      "price": 1899,
      "brand": "Tommy Hilfiger",
      "image": "../assets/images/sudadera_tommy.png",
      quantity: 0
  },
  {
      "itemId": 1123253811,
      "itemName": "Jeans straight American Eagle lavado medio corte cintura para mujer",
      "price": 1279,
      "brand": "American Eagle",
      "image": "../assets/images/jeans_american_eagle.png",
      quantity: 0
  },
  {
      "itemId": 1007942709,
      "itemName": "Reloj Michael Kors Parker para mujer MK5353",
      "price": 1778,
      "brand": "Michael Kors",
      "image": "../assets/images/reloj_mk.png",
      quantity: 0
  },
  {
      "itemId": 1137517888,
      "itemName": "Suéter Calvin Klein Jeans cuello tortuga para mujer",
      "price": 1679,
      "brand": "Calvin Klein Jeans",
      "image": "../assets/images/sueter_ck.png",
      quantity: 0
  },
  {
      "itemId": 1109391120,
      "itemName": "Bolsa Backpack Gino goganni",
      "price": 2159,
      "brand": "Gino goganni",
      "image": "../assets/images/bolsa_gino.png",
      "quantity": 0
  }
  ];


  constructor(private http: HttpClient) {}

  createOrder(payload: PayloadCreateOrder) {
    return of(payload).pipe(
      take(1),
      delay(1000),
      map(rsp => {
        let creationDate = new Date().toISOString();
        let cancellationDate = null;
        let orderId = Math.floor(1000 + Math.random() * 9000).toString();
        const {clientName, items, subtotal, total, tax} = rsp;
        let orders = [
          ...this.orders,
          {
            orderId,
            creationDate,
            cancellationDate,
            clientName,
            items,
            subtotal,
            total,
            tax
          }
        ];
        localStorage.setItem('orders', JSON.stringify(orders))
        return {
          orderId
        }
      })
    );
  }

  getOrderById(orderId: string) {
    return of(orderId).pipe(
      delay(1000),
      map(id => {
        let order = this.orders.find(odr => odr.orderId === orderId);
        return order || null;
      })
    );
  }

  cancelOrder(orderId: string) {
    return of(orderId).pipe(
      take(1),
      delay(1000),
      map(id => {
        let cancellationDate = new Date().toISOString();
        let orders = this.orders.map(odr => ({
          ...odr,
          cancellationDate: odr.orderId === orderId ? cancellationDate : odr.cancellationDate
        }));
        localStorage.setItem('orders', JSON.stringify(orders));
        return {
          orderId,
          cancellationDate
        }
      })
    );
  }

  getOrders(payload: PayloadGetOrders){
    return of(payload).pipe(
      take(1),
      delay(1000),
      map(rsp => {
        const {searchType, initialDate, finalDate} = rsp;
        if (!searchType || !initialDate || !finalDate) return this.orders;
        const min = initialDate.setHours(0,0,0);
        const max = finalDate.setHours(23,59,59);
        return this.orders.filter(order => {
          const valueDate = order[searchType] ? new Date(order[searchType]).getTime() : null;
          if (!valueDate) return false;
          return (valueDate > min) && (valueDate < max);
        })
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  get orders(): Order[] {
    let orders = localStorage.getItem('orders') || "[]";
    return JSON.parse(orders);
  }


}


