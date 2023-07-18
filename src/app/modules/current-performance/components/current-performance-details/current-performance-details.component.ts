import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPerformance } from 'src/app/modules/shared/models/performanceData';
import { getItemFromLocalStorage } from 'src/assets/config/utils';

@Component({
  selector: 'rpg-current-performance-details',
  templateUrl: './current-performance-details.component.html',
  styleUrls: ['./current-performance-details.component.scss']
})
export class CurrentPerformanceDetailsComponent implements OnInit {
  objSelectedPerformance: IPerformance | undefined;
  examDone: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.objSelectedPerformance = window.history.state && window.history.state.obj;

    if (!this.objSelectedPerformance) {
      this.goBack();
    }

    this.examDone = this.objSelectedPerformance && this.objSelectedPerformance.examDone || false;
  }

  goBack(): void {
    this.router.navigate(['/current-performance']);
  }

}
