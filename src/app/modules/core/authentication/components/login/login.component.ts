import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { appSettings } from 'app-settings';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';

interface ProfileExistenceResponse {
  message: string;
  code: number;
}

@Component({
  selector: 'rpg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private matBottomSheet: MatBottomSheet,
    private http: HttpClient
  ) { }

  imageError: string = "/assets/images/modal/modal-error.svg"
  titleError: string = ""

  //To-do
  // Tentar personalizar os required

  login(event: Event, email: string, password: string): void {
    event.preventDefault();

    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Usuário logado');
        this.checkProfileExistence(email);
      })
      .catch((error) => {
        const messageError = this.handleErrorLogin(error.message);
        this.openModalInfo(
          this.imageError,
          "Voltar",
          this.titleError || "Erro",
          this.titleError ? "" : messageError
        );
      });
  }

  checkProfileExistence(email: string): void {
    // Chamar a API para verificar se o perfil do usuário já existe
    const apiUrl = `${appSettings.apiUrl}/users/${encodeURIComponent(email)}`;

    this.http.get<ProfileExistenceResponse>(apiUrl)
      .subscribe(
        (response) => {

          //To-do
          // 1 - Colocar um loader pq ta demorando muito.
          if (response && response.code == 404) {
            this.router.navigate(['/create-profile'], { state: { email: email } });
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
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

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goForgetPassword() {
    this.router.navigate(['/forget-password']);
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

  handleErrorLogin(message: any): string {
    this.titleError = "";
    switch (message) {
      case 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).':
        message = "Senha inválida.";
        this.titleError = message;
        break;
      case 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).':
        message = "Não há registro de usuário correspondente a este e-mail."
        break;
      case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
        message = "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde."
        break;
      default:
        message = "Ocorreu um erro, por favor tente novamente!"
    }
    return message;
  }
}