import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentPerformanceRoutingModule } from './current-performance-routing.module';
import { CurrentPerformanceComponent } from './components/current-performance/current-performance.component';
import { CurrentPerformanceDetailsComponent } from './components/current-performance-details/current-performance-details.component';


@NgModule({
  declarations: [
    CurrentPerformanceComponent,
    CurrentPerformanceDetailsComponent
  ],
  imports: [
    CommonModule,
    CurrentPerformanceRoutingModule
  ]
})
export class CurrentPerformanceModule { }
