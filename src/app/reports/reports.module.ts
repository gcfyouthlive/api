import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReportsRoutingModule } from './reports-routing.module';

import { ReportsComponent } from './reports.component';
import { ChartAgeDemographicComponent } from './chart-age-demographic/chart-age-demographic.component';

import { ReportsDataService } from './shared/reports-data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReportsRoutingModule
  ],
  exports: [
    ReportsComponent
  ],
  declarations: [
    ReportsComponent,
    ChartAgeDemographicComponent,
  ],
  providers: [
    ReportsDataService
  ]
})
export class ReportsModule { }
