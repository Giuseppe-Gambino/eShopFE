import { Component, OnInit } from '@angular/core';
import { ResellerOrderService } from '../../services/reseller-order.service';
import { iResellerOrder } from '../../interfaces/i-reseller-order';
import { iStatsResellerOrders } from '../../interfaces/i-stats-reseller-orders';
import { iPageAble } from '../../interfaces/i-page-able';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss',
})
export class SellerDashboardComponent implements OnInit {
  status: string[] = ['IN_ELABORAZIONE', 'SPEDITO', 'CONSEGNATO'];
  listSize: number[] = [6, 12, 24, 36, 48, 60];

  resellerOrderArray: iResellerOrder[] = [];
  stats!: iStatsResellerOrders;

  constructor(private resellerSvc: ResellerOrderService) {}

  pageable!: iPageAble;
  currentPage: number = 0;
  currentSize: number = 12;

  orderStatus!: string;
  date?: string;
  startDate?: string;
  endDate?: string;

  ngOnInit(): void {
    this.onload();
  }

  resetData() {
    this.date = '';
  }

  onload(): void {
    this.resellerSvc
      .getResellerOrders(
        this.currentPage,
        this.currentSize,
        this.orderStatus,
        this.date,
        this.startDate,
        this.endDate
      )
      .subscribe((res) => {
        this.resellerOrderArray = res.content as iResellerOrder[];
        this.pageable = res;
        console.log(res.content);
      });

    this.resellerSvc.getStatsResellerOrders().subscribe((res) => {
      this.stats = res;
    });
  }

  editStatus(id: number, status: string): void {
    this.resellerSvc.editResellerOrder(id, status).subscribe({
      next: () => {
        this.onload();
      },
      error: (error) => {
        console.error(`Failed to update order ${id} status:`, error);
      },
    });
  }

  incrementa() {
    if (
      this.currentPage < this.pageable?.totalPages &&
      this.currentPage + 1 != this.pageable?.totalPages
    ) {
      this.currentPage++;
      this.onload();
    }
  }

  decrementa() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.onload();
    }
  }
}
