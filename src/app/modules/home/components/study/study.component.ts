import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import { getItemFromLocalStorage, getTranslatedSubjectName } from 'src/assets/config/utils';

@Component({
  selector: 'rpg-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {

  constructor(
    private router: Router,
    private matBottomSheet: MatBottomSheet
  ) { }

  chosenOption: string = ""

  ngOnInit(): void {
    const inProgress = getItemFromLocalStorage('inProgress');
    this.chosenOption = inProgress && inProgress.chosenOption;

    if (this.chosenOption) {
      this.router.navigate(['/subject-overview']);
      this.messageErrorStudyPaths(this.chosenOption);
      return;
    }
  }

  messageErrorStudyPaths(option: any) {
    let optionTranslated = getTranslatedSubjectName(option);

    const messageError = `Você precisa concluir a matéria em andamento: <strong>${optionTranslated}</strong>.`
    this.openModalInfo(
      "",
      "OK",
      "",
      "<strong>Ops!</strong>",
      messageError
    );
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  confirmSubjectSelection(option: any) {
    this.chosenOption = option;
    let optionTranslated = getTranslatedSubjectName(option);
    const messageOfChoice = `Você escolheu: <strong>${optionTranslated}</strong>`;

    this.openModalInfo(
      "",
      "Sim",
      "Não",
      "Tem certeza?",
      messageOfChoice,
    );
  }

  openModalInfo(image: string, buttonText: string, buttonText2: string, title: string, text: string) {
    this.matBottomSheet.open(ModalInfoComponent, {
      data: {
        image: image,
        buttonText: buttonText,
        buttonText2: buttonText2,
        title: title,
        text: text
      },
      panelClass: 'container-modal'
    })
      .afterDismissed()
      .subscribe(x => {
        if (x === "OK") {

          const inProgress = {
            chosenOption: this.chosenOption,
            value: true
          };

          localStorage.setItem('inProgress', JSON.stringify(inProgress));
          this.router.navigate(['/subject-overview']);
        }
      })
  }

}
