import { Component, OnInit } from '@angular/core';
import { ResellerOrderService } from '../../services/reseller-order.service';
import { iResellerOrder } from '../../interfaces/i-reseller-order';
import { IPageResellerOrder } from '../../interfaces/i-page-reseller-order';
import { iStatsResellerOrders } from '../../interfaces/i-stats-reseller-orders';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss',
})
export class SellerDashboardComponent implements OnInit {
  status: string[] = ['IN_ELABORAZIONE', 'SPEDITO', 'CONSEGNATO'];

  resellerOrderArray: iResellerOrder[] = [];
  stats!: iStatsResellerOrders;

  constructor(private resellerSvc: ResellerOrderService) {}

  pageable!: IPageResellerOrder;
  currentPage: number = 0;

  orderStatus!: string;
  date?: string;
  startDate?: string;
  endDate?: string;

  ngOnInit(): void {
    this.onload();
  }

  onload(): void {
    this.resellerSvc
      .getResellerOrders(
        this.currentPage,
        this.orderStatus,
        this.date,
        this.startDate,
        this.endDate
      )
      .subscribe((res) => {
        this.resellerOrderArray = res.content;
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
}
