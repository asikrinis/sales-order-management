import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/orders.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService){
    this.orderForm = this.fb.group({
      clientName: ['', Validators.required],
      items: this.fb.array([])
    });
  }

  addItem() {
    const itemForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
    this.items.push(itemForm);
  }

  createOrder(): void {
    if (this.orderForm.valid) {
      this.orderService.createOrder(this.orderForm.value).subscribe( result => {
        this.items.clear();
        this.orderForm.reset();
      });
    }
  }

  get items() {
    return this.orderForm.get('items') as FormArray;
  }
}
