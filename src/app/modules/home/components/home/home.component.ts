import { HttpClient } from '@angular/common/http';
import { ICompletedResponse } from './../../interfaces/ICompletedResponse';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import { IUserData } from 'src/app/modules/shared/models/userData';
import { customSettings } from 'src/assets/config/customSettings';
import { getItemFromLocalStorage, getUserFromLocalStorage } from 'src/assets/config/utils';
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
  loading: boolean = false;
  imageError: string = Images.ERROR;
  email!: string;

  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.user = getUserFromLocalStorage();
    this.name = this.user && this.user.name;
    console.log('nome :', this.name);
  }

  studyPaths(): void {
    // To-do
    // 1 - Ja navega falta criar tela
    this.router.navigate(['/study']);
  }

  takeExams(): void {
    this.checkSubjectCompletion();
  }

  restartFromZero(): void {
    //To-Do
    // 1 - Lógica para reiniciar o jogo do zero
    // 2 - perguntar se realmente quer de ctz reiniciar o jogo
  }

  viewCurrentPerformance(): void {
    // To-do
    // 1 - Ja navega falta criar tela
    this.router.navigate(['/current-performance']);
  }

  viewProfile(): void {
    // To-do
    // 1 - Ja navega falta criar tela
    this.router.navigate(['/profile']);
  }

  viewGameRules(): void {
    // To-do
    // 1 - Ja navega falta criar tela
    this.router.navigate(['/game-rules']);
  }

  goToFeeback(): void {
    this.router.navigate(['/feedback']);
  }

  goToLogin() {
    this.flagLogin = true;
    this.openModalInfoChoose(
      "Tem certeza?",
      "Sim",
      "Não"
    );
  }

  checkSubjectCompletion(): void {
    const completed = getItemFromLocalStorage('completed');

    if (completed == null) {
      this.callCheckSubjectCompletion();
    } else if (completed) {
      this.router.navigate(['/exams']);
    } else {
      this.messageErrorCheck();
    }
  }

  callCheckSubjectCompletion() {
    this.loading = true;
    const apiUrl = `${customSettings.apiUrl}/subjects/check-status/${encodeURIComponent(this.user.email)}`;

    this.http.get<ICompletedResponse>(apiUrl)
      .subscribe(
        (response) => {
          this.loading = false;
          if (response && response.completed) {
            localStorage.setItem('completed', "true");
            this.router.navigate(['/exams']);
          } else {
            localStorage.setItem('completed', "false");
            this.messageErrorCheck();
          }
        },
        (error) => {
          this.loading = false;
          const messageError = error && error.error && error.error.message || "Ocorreu um erro, por favor tente novamente!";
          this.openModalInfo(
            this.imageError,
            "Voltar",
            "Erro",
            messageError
          );
        }
      );
  }

  messageErrorCheck() {
    const messageError = `Você precisa completar pelo menos 1 atividade antes de fazer a prova acesse: <strong>Trilhas para Estudo</strong>.`
    this.openModalInfo(
      "",
      "OK",
      "<strong>Erro</strong>",
      messageError
    );
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

  openModalInfoChoose(title: string, confirmButtonText: string, cancelButtonText: string) {
    this.matBottomSheet.open(ModalInfoComponent, {
      data: {
        title: title,
        buttonText: confirmButtonText,
        buttonText2: cancelButtonText
      },
      panelClass: 'container-modal'
    })
      .afterDismissed()
      .subscribe(x => {
        console.log(x)
        if (x === "OK" && this.flagLogin) {
          this.flagLogin = false;
          this.router.navigate(['/login']);
        }
      })
  }

}
