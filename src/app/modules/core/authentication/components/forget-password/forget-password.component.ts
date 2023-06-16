import { ModalInfoComponent } from './../../../../shared/components/modal-info/modal-info.component';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'rpg-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private matBottomSheet: MatBottomSheet
  ) { }

  imageError: string = "/assets/images/modal/modal-error.svg"
  imageSuccess: string = "/assets/images/modal/modal-success.svg"
  flagLogin: boolean = false;

  resetPassword(event: Event, email: string): void {
    event.preventDefault();
    this.auth.sendPasswordResetEmail(email)
      .then(() => {
        const messageSucess = `Um e-mail de redefinição de senha foi enviado para o endereço <strong>${email}</strong>. Verifique sua caixa de entrada ou pasta de spam e siga as instruções para alterar sua senha.`
        this.flagLogin = true;
        this.openModalInfo(
          this.imageSuccess,
          "Ir para o login",
          "E-mail enviado",
          messageSucess
        );

      })
      .catch((error) => {
        const messageError = this.handleErrorForget(error.message);
        this.openModalInfo(
          this.imageError,
          "Voltar",
          "Erro",
          messageError
        );
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
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
        if (this.flagLogin) {
          this.router.navigate(['/login']);
        }
      })
  }

  handleErrorForget(message: any): string {
    switch (message) {
      case 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).':
        message = "Não há registro de usuário correspondente a este e-mail. Por favor verique seu e-mail e tente novamente.";
        break;
      default:
        message = "Ocorreu um erro, por favor tente novamente!"
    }
    return message;
  }

}