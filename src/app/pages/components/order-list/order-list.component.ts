import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/orders.service';
import { Order, PayloadGetOrders } from '../../interfaces/order.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  maxDate: Date = new Date();

  form: PayloadGetOrders = {
    searchType: null,
    initialDate: null,
    finalDate: null
  };

  searchTypeCat = [
    {value:null, name: 'Ninguna' },
    {value:'creationDate', name: 'Por fecha de creación' },
    {value:'cancellationDate',name: 'Por fecha de cancelación' },
  ]

  displayedColumns: string[] =['id', 'clientName', 'creationDate', 'total', 'actions'];
  dataSource = new MatTableDataSource<Order>([]);
  constructor(
    private orderService: OrderService,
    private router: Router,
    public dialog: MatDialog){}
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders(this.form).subscribe((orders) => {
      this.dataSource.data = orders;
    })
  }


  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement ? inputElement.value : '';
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyDateFilter() {
    // const {searchType, initialDate, finalDate} = this.form;
    // if (!searchType) {
    //   this.form.initialDate = null;
    //   this.form.finalDate = null;
    // }
    console.log(this.form);

    this.getOrders();
    // if (this.form.initialDate && this.form.finalDate && this.form.initialDate > this.form.finalDate) {
    //   this.form.initialDate = null;
    // } else {
    //   const filteredOrders = this.dataSource.data.filter((order: Order) => {
    //     const creationDate = new Date(order.creationDate);
    //     return (!this.form.initialDate || creationDate >= this.form.initialDate) &&
    //            (!this.form.finalDate || creationDate <= this.form.finalDate);
    //   });
    //   this.dataSource.data = filteredOrders;
    // }
  }

  deleteOrder(order: Order) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: "¿Estás seguro de que quieres borrar esta orden?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.cancelOrder(order.orderId).subscribe((result) => {
          this.dataSource.data = this.dataSource.data.filter(odr => odr.orderId !== order.orderId);
        });
      }
    });
  }

}
