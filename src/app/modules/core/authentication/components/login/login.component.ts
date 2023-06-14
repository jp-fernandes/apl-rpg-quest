import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { appSettings } from 'app-settings';

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
    private http: HttpClient
  ) { }

  login(event: Event, email: string, password: string): void {
    event.preventDefault();

    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Usuário logado');
        this.checkProfileExistence(email);
      })
      .catch((error) => {
        //To-do
        // 1 - Colocar uma modal para exibir uma mensagem de erro ao usuário informando o erro ocorrido
        console.log(this.handleErrorLogin(error.message));
      });
  }

  checkProfileExistence(email: string): void {
    // Chamar a API para verificar se o perfil do usuário já existe
    const apiUrl = `${appSettings.apiUrl}/users/${encodeURIComponent(email)}`;

    this.http.get<ProfileExistenceResponse>(apiUrl)
      .subscribe(
        (response) => {

          if (response && response.code == 404) {
            this.router.navigate(['/create-profile'], { queryParams: { email: email } });
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('Erro ao chamar a API:', error);
          //To-do
          // 1 - Colocar uma modal para exibir uma mensagem de erro ao usuário informando o erro ocorrido
        }
      );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goForgetPassword() {
    this.router.navigate(['/forget-password']);
  }

  handleErrorLogin(message: any): void {
    switch (message) {
      case 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).':
        message = "A senha é inválida ou o usuário não possui senha";
        break;
      case 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).':
        message = "Não há registro de usuário correspondente a este e-mail."
        break;
      default:
        message = "Erro de login não tratado"
    }
    return message;
  }
}