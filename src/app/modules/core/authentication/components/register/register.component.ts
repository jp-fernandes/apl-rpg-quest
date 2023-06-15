import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';

@Component({
  selector: 'rpg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private matBottomSheet: MatBottomSheet
  ) { }

  imageError: string = "/assets/images/modal/modal-error.svg"
  imageSuccess: string = "/assets/images/modal/modal-success.svg"
  flagLogin: boolean = false;
  flagForget: boolean = false;

  register(event: Event, email: string, password: string, confirmPassword: string, confirmEmail: string): void {
    event.preventDefault();

    if (confirmEmail !== email) {
      const emailError = "E-mails não correspondentes. Por favor, verifique novamente."
      this.openModalInfo(
        this.imageError,
        "Voltar",
        "Ops!",
        emailError
      );

      return;
    }

    if (confirmPassword !== password) {
      const passwordError = "Senhas não correspondentes. Por favor, verifique novamente."
      this.openModalInfo(
        this.imageError,
        "Voltar",
        "Ops!",
        passwordError
      );

      return;
    }

    this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid;

        const messageSucess = "Seu cadastro foi realizado com sucesso! Agora vá para a página de login, faça o login e inicie a criação do seu perfil."
        this.flagLogin = true;
        this.openModalInfo(
          this.imageSuccess,
          "Ir para o login",
          "Parabéns!",
          messageSucess
        );

      })
      .catch((error) => {
        const messageError = this.handleErrorRegister(error.message);
        this.openModalInfo(
          this.imageError,
          this.flagForget ? "Redefinir senha" : "Voltar",
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
        } else if (this.flagForget && x === "OK") {
          this.router.navigate(['/forget-password']);
        }
      })
  }

  handleErrorRegister(message: any): string {
    this.flagForget = false;
    switch (message) {
      case 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).':
        message = "O endereço de e-mail já está sendo usado por outra conta. Se você esqueceu a sua senha, clique em '<strong>Redefinir senha</strong>' para redefini-la.";
        this.flagForget = true;
        break;
      case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
        message = "A senha deve ter pelo menos 6 caracteres"
        break;
      default:
        message = "Ocorreu um erro, por favor tente novamente!"
    }
    return message;
  }

}
