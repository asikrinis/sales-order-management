import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/orders.service';
import { Item, Product } from '../../interfaces/order.interfaces';
import { Subscription, debounceTime, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CatalogComponent } from '../catalog/catalog.component';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  products: Product[] = [];
  cargarsvg= true;

  subForm = new Subscription();

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    public dialog: MatDialog
  ) {
    this.orderForm = this.fb.group({
      clientName: ['', Validators.required],
      items: this.fb.array([], Validators.required),
      subtotal: this.fb.control(null, Validators.required),
      tax: this.fb.control(null, Validators.required),
      total: this.fb.control(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.orderService.getProducts().subscribe(data => {
      this.products = data;
    });
    this.subForm = this.orderForm.valueChanges.pipe(debounceTime(500)).subscribe(order => {
      let items: any[] = order.items;
      const subtotal = items.reduce((acc, item) => {
        const subtotalItm = (item.price * item.quantity) || 0;
        return acc + subtotalItm;
      }, 0);
      const tax = subtotal * 0.15;
      this.orderForm.patchValue({
        subtotal,
        tax,
        total: subtotal + tax
      }, {emitEvent: false})
    });
  }

  ngOnDestroy(): void {
    this.subForm.unsubscribe();
  }

  addItem(product: Product) {
    const itemForm = this.fb.group({
      itemId: [product.itemId, Validators.required],
      itemName: [product.itemName, Validators.required],
      price: [product.price, Validators.required],
      quantity: [product.quantity || 1, [Validators.required, Validators.min(1), Validators.max(100)]],
    });
    this.items.push(itemForm);
  }

  addSelectedItems() {
    this.dialog.open(CatalogComponent, {

    }).afterClosed().pipe(take(1)).subscribe( (products: Product[]) => {
      if (!products) return;
      products.forEach(product => this.addItem(product));
    });
  }

  deleteItem(index: number): void {
    const items = this.orderForm.get('items') as FormArray;
    items.removeAt(index);
  }

  createOrder(): void {
    if (this.orderForm.valid) {
      this.cargarsvg = false;
      this.orderService.createOrder(this.orderForm.value).subscribe( result => {
        this.items.clear();
        this.orderForm.reset();
        this.cargarsvg = true;
      });
    }
  }

  getImage(itemId: number) {
    const prd = this.products.find(rte => rte.itemId === itemId);
    return prd ? prd.image : null;
  }

  changeQty(i: number, value: number){
    const newValue = this.items.at(i).get('quantity')?.value + value;
    if (newValue ? newValue > 100 : true) return;
    this.items.at(i).get('quantity')?.patchValue(newValue);
  }

  get items() {
    return this.orderForm.get('items') as FormArray;
  }
}
