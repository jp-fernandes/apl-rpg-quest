import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import { IPerformance } from 'src/app/modules/shared/models/performanceData';
import { getTranslatedSubjectName } from 'src/assets/config/utils';

@Component({
  selector: 'rpg-current-performance-details',
  templateUrl: './current-performance-details.component.html',
  styleUrls: ['./current-performance-details.component.scss']
})
export class CurrentPerformanceDetailsComponent implements OnInit {
  objSelectedPerformance: IPerformance | undefined;
  examDone: boolean = false;
  flagExam: boolean = false;
  subjectTranslated: string = '';
  subject: string = '';

  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router
  ) { }

  ngOnInit() {
    this.objSelectedPerformance = window.history.state && window.history.state.obj;

    if (!this.objSelectedPerformance) {
      this.goBack();
    }

    this.subject = this.objSelectedPerformance?.subject || '';
    this.subjectTranslated = getTranslatedSubjectName(this.subject);

    this.secondChance();

    this.examDone = this.objSelectedPerformance && this.objSelectedPerformance.examDone || false;
  }

  secondChance() {

    if (this.objSelectedPerformance?.examDone && this.objSelectedPerformance?.scoreTotal < 7) {
      this.flagExam = true;

      this.openModalInfoChoose(
        "",
        "<strong>Infelizmente, você foi reprovado nessa matéria. Deseja refazer uma nova prova?</strong>",
        `Prepare-se para fazer uma prova da matéria: <strong>${this.subjectTranslated}</strong>, Boa sorte! Deseja iniciar agora?`,
        "Sim",
        "Não"
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/current-performance']);
  }

  openModalInfoChoose(image: string, title: string, text: string, confirmButtonText: string, cancelButtonText: string) {
    this.matBottomSheet.open(ModalInfoComponent, {
      data: {
        image: image,
        title: title,
        text: text,
        buttonText: confirmButtonText,
        buttonText2: cancelButtonText
      },
      panelClass: 'container-modal'
    })
      .afterDismissed()
      .subscribe(x => {
        if (x === "OK" && this.flagExam) {

          const inProgress = {
            chosenOption: this.subject,
            value: true
          };

          localStorage.setItem('inProgress', JSON.stringify(inProgress));

          this.router.navigate(['/exam']);
        }
      })
  }

}
