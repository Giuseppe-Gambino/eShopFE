import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent, GridComponent } from 'echarts/components';

import { ShopPageRoutingModule } from './shop-page-routing.module';
import { ShopPageComponent } from './shop-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FormsModule } from '@angular/forms';

echarts.use([LineChart, CanvasRenderer, TooltipComponent, GridComponent]);

@NgModule({
  declarations: [ShopPageComponent, ProductPageComponent],
  imports: [
    CommonModule,
    ShopPageRoutingModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
})
export class ShopPageModule {}
