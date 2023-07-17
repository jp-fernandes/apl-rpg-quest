import { Component, OnInit, HostListener } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { Router } from '@angular/router';
import { getItemFromLocalStorage } from 'src/assets/config/utils';

@Component({
  selector: 'rpg-subject-overview',
  templateUrl: './subject-overview.component.html',
  styleUrls: ['./subject-overview.component.scss']
})
export class SubjectOverviewComponent implements OnInit {
  chosenOption!: string;
  title!: string;
  overview!: string;
  subTopics: string[] = [];
  currentPage: number = 1;

  constructor(
    private subjectService: SubjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const inProgress = getItemFromLocalStorage('inProgress');
    this.chosenOption = inProgress.chosenOption;

    if (this.chosenOption) {
      const subjectData = this.subjectService.getSubjectData(this.chosenOption);

      if (subjectData) {
        this.title = subjectData.title;
        this.overview = subjectData.overview;
        this.subTopics = subjectData.subTopics;
      }
    } else {
      // Redirecionar para a página inicial se a opção escolhida não for válida
    }
  }

  nextPage() {
    if (this.currentPage === 2) {
      this.router.navigate(['/exercises']);
    } else {
      this.currentPage++;
    }
  }

  previousPage() {
    this.currentPage--;
  }
}
