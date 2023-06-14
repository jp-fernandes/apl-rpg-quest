import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'rpg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  register(event: Event, email: string, password: string, confirmPassword: string, confirmEmail: string): void {
    event.preventDefault();
  
    if (confirmEmail !== email) {
      console.log('Os e-mails não correspondem.');
      // To-do: Colocar uma modal para exibir uma mensagem de erro ao usuário
      return;
    }
  
    if (confirmPassword !== password) {
      console.log('As senhas não correspondem.');
      // To-do: Colocar uma modal para exibir uma mensagem de erro ao usuário
      return;
    }
  
    this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid;
        console.log('Usuário criado:', uid);
        // To-do: Redirecionar para a página desejada
      })
      .catch((error) => {
        console.log(this.handleErrorRegister(error.message));
        // To-do: Colocar uma modal para exibir uma mensagem de erro ao usuário informando o erro ocorrido
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  handleErrorRegister(message: any): void {
    switch (message) {
      case 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).':
        message = "O endereço de e-mail já está sendo usado por outra conta";
        break;
      case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
        message = "A senha deve ter pelo menos 6 caracteres"
        break;
      default:
        message = "Erro ao criar usuario não tratado"
    }
    return message;
  }

}