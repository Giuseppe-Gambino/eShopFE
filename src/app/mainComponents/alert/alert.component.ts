import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit {
  constructor(private alert: AlertService) {}

  icons = {
    tick: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    warning:
      'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    error:
      'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  };

  status = {
    success: 'bg-green',
    info: 'bg-primary',
  };

  show: boolean = false;
  message: string = '';
  statusColor: string = 'bg-primary';
  iconSelect: string = '';

  ngOnInit(): void {
    this.iconSelect = this.icons.error;
    this.alert.alertBoolean.subscribe((boo) => {
      this.show = boo;
    });
  }
}
