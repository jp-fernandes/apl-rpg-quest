import { Component, OnInit, HostListener } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { Router } from '@angular/router';
import { getItemFromLocalStorage } from 'src/assets/config/utils';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

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
  exercises: boolean = false;

  constructor(
    private subjectService: SubjectService,
    private matBottomSheet: MatBottomSheet,
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
      this.exercises = true;

      const titleSucess = `<strong>Vamos para o desafio?</strong>`;
      const messageSucess = "Os exercícios vão começar! Tente alcançar a nota máxima de <strong>4 pontos.</strong>";

      this.openModalInfo(
        "",
        "Vamos!",
        titleSucess,
        messageSucess
      );
    } else {
      this.currentPage++;
    }
  }

  previousPage() {
    this.currentPage--;
  }

  openModalInfo(image: string, buttonText: string, title: string, text: string) {
    this.matBottomSheet.open(ModalInfoComponent, {
      data: {
        image: image,
        buttonText: buttonText,
        title: title,
        text: text
      },
      panelClass: 'container-modal'
    })
      .afterDismissed()
      .subscribe(x => {
        if (this.exercises) {
          this.router.navigate(['/exercises']);
        }
      })
  }
}
