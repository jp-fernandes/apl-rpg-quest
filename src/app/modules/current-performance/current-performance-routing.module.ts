import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentPerformanceDetailsComponent } from './components/current-performance-details/current-performance-details.component';

const routes: Routes = [
  { path: 'performance-details', component: CurrentPerformanceDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentPerformanceRoutingModule { }
