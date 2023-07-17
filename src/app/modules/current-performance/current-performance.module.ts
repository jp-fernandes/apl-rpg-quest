import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentPerformanceRoutingModule } from './current-performance-routing.module';
import { CurrentPerformanceComponent } from './components/current-performance/current-performance.component';


@NgModule({
  declarations: [
    CurrentPerformanceComponent
  ],
  imports: [
    CommonModule,
    CurrentPerformanceRoutingModule
  ]
})
export class CurrentPerformanceModule { }
