import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';
import { Item, Order, PayloadGetOrders } from '../interfaces/order.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  createOrder(payload: {clientName: string, items: Item[]}) {
    return of(payload).pipe(
      take(1),
      delay(1000),
      map(rsp => {
        let creationDate = new Date().toISOString();
        let cancellationDate = null;
        let orderId = Math.floor(1000 + Math.random() * 9000).toString();
        let orders = [
          ...this.orders,
          {
            orderId,
            creationDate,
            cancellationDate,
            clientName: rsp.clientName,
            items: rsp.items
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
        const min = initialDate.getTime();
        const max = finalDate.getTime();
        return this.orders.filter(order => {
          const valueDate = order[searchType] ? new Date(order[searchType]).getTime() : null;
          if (!valueDate) return false;
          return (valueDate > min) && (valueDate < max);
        })
      })
    );
  }

  get orders(): Order[] {
    let orders = localStorage.getItem('orders') || "[]";
    return JSON.parse(orders);
  }


}


