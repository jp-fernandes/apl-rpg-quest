import { HttpClient } from '@angular/common/http';
import { ICompletedResponse } from './../../interfaces/ICompletedResponse';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import { IUserData } from 'src/app/modules/shared/models/userData';
import { customSettings } from 'src/assets/config/customSettings';
import { getItemFromLocalStorage, getTranslatedSubjectName, getUserFromLocalStorage } from 'src/assets/config/utils';
import Images from 'src/app/modules/shared/enums/images.enum';

@Component({
  selector: 'rpg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: IUserData = {
    email: '',
    name: '',
    surname: '',
    age: 0,
    gender: '',
    city: '',
    state: '',
    createdDate: ''
  };

  name = '';
  flagLogin: boolean = false;
  flagExam: boolean = false;
  flagReset: boolean = false;
  loading: boolean = false;
  email!: string;
  countError: number = 0;
  imageError: string = Images.ERROR;
  imageSuccess: string = Images.SUCCESS;

  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.user = getUserFromLocalStorage();
    this.name = this.user && this.user.name;
  }

  studyPaths(): void {
    const inProgress = getItemFromLocalStorage('inProgress');

    if (inProgress && inProgress.value) {
      this.messageErrorStudyPaths(inProgress.chosenOption);
    } else {
      this.router.navigate(['/study']);
    }

  }

  takeExams(): void {
    this.checkSubjectCompletion();
  }

  restartFromZero(): void {
    const noData = getItemFromLocalStorage('noData');

    if (noData) {
      this.mensageErrorNoData();
      return;
    }

    this.flagReset = true;
    this.openModalInfoChoose(
      Images.WARNING,
      "<strong>Tem certeza que deseja reiniciar o jogo?</strong>",
      "Isso significa que todo o seu progresso será apagado.",
      "Sim",
      "Não"
    );
  }

  viewCurrentPerformance(): void {
    this.router.navigate(['/current-performance']);
  }

  viewProfile(): void {
    this.router.navigate(['/profile']);
  }

  viewGameRules(): void {
    this.router.navigate(['/game-rules']);
  }

  goToFeeback(): void {
    this.router.navigate(['/feedback']);
  }

  goToLogin() {
    this.flagLogin = true;
    this.openModalInfoChoose(
      "",
      "Tem certeza?",
      "",
      "Sim",
      "Não"
    );
  }

  checkSubjectCompletion(): void {
    const completedForExam = getItemFromLocalStorage('completedForExam');
    const partialExercises = getItemFromLocalStorage('partialExercises');

    if (completedForExam == null) {
      this.callCheckSubjectCompletion();
    } else if (partialExercises || completedForExam) {
      this.goToExam();
    } else {
      this.messageErrorCheck();
    }
  }

  goToExam() {
    this.flagExam = true;
    const inProgress = getItemFromLocalStorage('inProgress');
    const subject = inProgress && inProgress.chosenOption;
    let subjectTranslated = getTranslatedSubjectName(subject);

    this.openModalInfoChoose(
      "",
      "<strong>Prova Final</strong>",
      `Prepare-se para fazer a prova da matéria: <strong>${subjectTranslated}</strong>, que você escolheu na sua trilha de estudo. Boa sorte! Deseja iniciar agora?`,
      "Sim",
      "Não"
    );
  }

  callCheckSubjectCompletion() {
    this.loading = true;
    const apiUrl = `${customSettings.apiUrl}/subjects/check-status/${encodeURIComponent(this.user.email)}`;

    this.http.get<ICompletedResponse>(apiUrl)
      .subscribe(
        (response) => {
          this.loading = false;
          if (response && response.completedForExam) {
            localStorage.setItem('completedForExam', "true");
            this.router.navigate(['/exam']);
          } else {
            localStorage.setItem('completedForExam', "false");
            this.messageErrorCheck();
          }
        },
        (error) => {
          this.loading = false;
          const messageError = error && error.error && error.error.message || "Ocorreu um erro, por favor tente novamente!";
          this.openModalInfo(
            Images.ERROR,
            "Voltar",
            "Erro",
            messageError
          );
        }
      );
  }

  messageErrorCheck() {
    const messageError = `Você precisa completar pelo menos 1 atividade da matéria em andamento antes de fazer a prova, caso não tenha nenhuma matéria em andamento acesse: <strong>Trilhas para Estudo</strong>.`
    this.openModalInfo(
      "",
      "OK",
      "<strong>Erro</strong>",
      messageError
    );
  }

  messageErrorStudyPaths(option: any) {
    let optionTranslated = getTranslatedSubjectName(option);

    if (this.countError < 1) {
      this.countError++;
      const messageError = `Você precisa concluir a prova da matéria em andamento: <strong>${optionTranslated}</strong> antes de iniciar uma nova.`
      this.openModalInfo(
        "",
        "OK",
        "<strong>Ops!</strong>",
        messageError
      );
    } else {
      const messageError = `Você precisa concluir a prova da matéria em andamento: <strong>${optionTranslated}</strong> antes de iniciar uma nova. Caso tenha dificuldades para conseguir acessar alguma matéria, clique em <strong>Recomeçar do zero.</strong>`
      this.openModalInfo(
        "",
        "OK",
        "<strong>Ops!</strong>",
        messageError
      );
    }

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
        if (x === "OK" && this.flagLogin) {
          this.clearFullLocalStorage();
          this.flagLogin = false;
          this.router.navigate(['/login']);
        } else if (x === "OK" && this.flagReset) {
          this.flagReset = false;
          this.callDeleteActivities();
          this.callDeletePerformance();
        } else if (x === "OK" && this.flagExam) {
          this.router.navigate(['/exam']);
        }
      })
  }

  removeAllItemsLocalStorageExceptUser() {
    const user = this.user;
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearFullLocalStorage() {
    localStorage.clear();
  }

  callDeleteActivities() {
    this.countError = 0;
    this.loading = true;
    const apiUrl = `${customSettings.apiUrl}/subjects/activities/${encodeURIComponent(this.user.email)}`;

    this.http.delete<any>(apiUrl)
      .subscribe(
        (response) => {
          this.loading = false;
          if (response && response.deleted) {
            this.removeAllItemsLocalStorageExceptUser();

            const titleSucess = `<strong>Seu jogo foi reiniciado com sucesso!</strong>`;
            const messageSucess = "Agora você pode começar uma nova jornada.";

            this.openModalInfo(
              this.imageSuccess,
              "OK",
              titleSucess,
              messageSucess
            );

          } else if (response && response.noData) {
            localStorage.setItem('noData', 'true');
            this.mensageErrorNoData();
          }
        },
        (error) => {
          this.loading = false;
          const messageError = "Ocorreu um erro, por favor tente novamente!";
          this.openModalInfo(
            this.imageError,
            "Voltar",
            "Erro",
            messageError
          );
        }
      );
  }

  callDeletePerformance() {
    this.loading = true;
    const apiUrl = `${customSettings.apiUrl}/performance/performance-data/${encodeURIComponent(this.user.email)}`;

    this.http.delete<any>(apiUrl)
      .subscribe(
        (response) => {
          this.loading = false;
          if (response && response.deleted) {
            this.removeAllItemsLocalStorageExceptUser();
          }
        },
        (error) => {
          this.loading = false;
          const messageError = "Ocorreu um erro, por favor tente novamente!";
          this.openModalInfo(
            this.imageError,
            "Voltar",
            "Erro",
            messageError
          );
        }
      );
  }

  mensageErrorNoData() {
    const titleInfo = `<strong>Ops!</strong>`;
    const messageInfo = "Parece que você ainda não iniciou o jogo, não há nada para reiniciar.";

    this.openModalInfo(
      this.imageSuccess,
      "OK",
      titleInfo,
      messageInfo
    );
  }

}
