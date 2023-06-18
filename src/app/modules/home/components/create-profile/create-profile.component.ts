import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { customSettings } from 'src/assets/config/customSettings';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';

@Component({
  selector: 'rpg-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  email!: string;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private matBottomSheet: MatBottomSheet
  ) { }

  imageError: string = "/assets/images/modal/modal-error.svg"
  imageSuccess: string = "/assets/images/modal/modal-success.svg"
  titleError: string = ""
  flagLogin: boolean = false;
  flagHome: boolean = false;

  ngOnInit(): void {
    this.email = window.history.state && window.history.state.email;
    console.log("email recebido ", this.email)
  }

  createProfile(
    event: Event,
    name: string,
    surname: string,
    age: string,
    gender: string,
    city: string,
    state: string
  ): void {
    event.preventDefault();

    const ageNumber = parseInt(age, 10);
    const stateUpper = state.toUpperCase();

    const payload = {
      age: ageNumber,
      name,
      surname,
      gender,
      city,
      state: stateUpper,
      email: this.email
    };

    if (!payload.email) {
      const messageError = "Desculpe, ocorreu um erro. Por favor, faça login novamente."
      this.flagLogin = true;
      this.openModalInfo(
        this.imageError,
        "Ir para o login",
        "Ops!",
        messageError
      );

      return;
    }

    this.createUserProfile(payload);
  }

  createUserProfile(payload: any): void {
    const apiUrl = `${customSettings.apiUrl}/users`;
    this.loading = true;

    this.http.post(apiUrl, payload).subscribe(
      (response) => {
        this.loading = false;
        localStorage.setItem('user', JSON.stringify(payload));
        const messageSucess = "Seu perfil foi criado com sucesso! Agora vamos começar o aprendizado!";
        const titleSucess = `Parabéns, <strong>${payload.name}</strong>!`;
        this.flagHome = true;
        this.openModalInfo(
          this.imageSuccess,
          "Ir para home",
          titleSucess,
          messageSucess
        );

      },
      (error) => {
        this.loading = false;
        const messageError = this.handleErrorCreateProfile(error.message);
        this.openModalInfo(
          this.imageError,
          "Voltar",
          this.titleError || "Erro",
          this.titleError ? "" : messageError
        );
      }
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
      .subscribe(x => {
        if (this.flagLogin) {
          this.router.navigate(['/login']);
        } else if (this.flagHome) {
          this.router.navigate(['/home']);
        }
      })
  }

  handleErrorCreateProfile(error: any): string {
    this.titleError = "";
    if (error && error.error && error.error.code == "409" || error && error.error && error.error.error == "Usuário já existe") {
      error = "Usuário já existe!"
      this.titleError = error;
    } else {
      error = "Ocorreu um erro na criação do perfil, por favor tente novamente!";
    }
    return error;
  }
}
