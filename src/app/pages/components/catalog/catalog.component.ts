import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../interfaces/order.interfaces';
import { OrderService } from '../../services/orders.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  products: Product[] = [];
  selectedProducts: Product[] = [];

  constructor(
    private orderService: OrderService,
    public dialogRef: MatDialogRef<CatalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ){}

  ngOnInit(): void {
    this.orderService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addSelectedItems() {
    this.dialogRef.close(this.selectedProducts);
  }

  onProductSelect(product: Product, isChecked: boolean): void {
    if (isChecked) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p.itemId !== product.itemId);
    }
  }

}
