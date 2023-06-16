import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import { IUserData } from 'src/app/modules/shared/models/userData';
import { getUserFromLocalStorage } from 'src/assets/config/utils';

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

  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = getUserFromLocalStorage();
    this.name = this.user.name;
    console.log('nome :', this.name);
  }

  studyPaths(): void {
    // To-do
    // 1 - Ja navega falta criar tela
    this.router.navigate(['/study']);
  }

  takeExams(): void {
    //To-Do
    // 1 - Verificar se o usuário estudou algum conteúdo na página de "trilhas para estudo" - Só permitir fazer a prova se tiver feito isso.
    this.router.navigate(['/exams']);
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

  goToLogin() {
    this.flagLogin = true;
    this.openModalInfoChoose(
      "Tem certeza?",
      "Sim",
      "Não"
    );
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
