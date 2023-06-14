import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  resetPassword(event: Event, email: string): void {
    event.preventDefault();
    this.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('E-mail de redefinição de senha enviado.');
        // To-Do 
        // 1 - Colocar uma modal de sucesso e direcionar para login assim que clicar em OK
      })
      .catch((error) => {
        console.error('Erro ao enviar e-mail de redefinição de senha:', error);
        // To-Do 
        // 1 - Colocar uma modal para exibir uma mensagem de erro ao usuário informando o erro ocorrido
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}