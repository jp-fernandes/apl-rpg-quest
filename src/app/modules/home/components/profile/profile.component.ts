import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import { IUserData } from 'src/app/modules/shared/models/userData';
import { customSettings } from 'src/assets/config/customSettings';
import { getEmptyFields, getUserFromLocalStorage, handleMessage } from 'src/assets/config/utils';

@Component({
  selector: 'rpg-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
  imageError: string = "/assets/images/modal/modal-error.svg"
  imageSuccess: string = "/assets/images/modal/modal-success.svg"
  editMode: boolean = false;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private matBottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.user = getUserFromLocalStorage();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  saveProfile(): void {
    const payload: Record<string, any> = {
      age: this.user.age,
      name: this.user.name,
      surname: this.user.surname,
      gender: this.user.gender,
      city: this.user.city,
      state: this.user.state.toUpperCase(),
      email: this.user.email //primary key
    };

    const emptyFields = getEmptyFields(payload);

    if (emptyFields.length > 0) {
      const messageError = "Por favor, Informe o(s) campo(s) abaixo:"
      const missingFieldsMessage = handleMessage(emptyFields);
      this.openModalInfo(
        this.imageError,
        "OK",
        messageError,
        missingFieldsMessage
      );
      return;
    } else {
      console.log('Dados salvos:', payload);
      this.updateUserProfile(payload);
    }
    //To-Do
    // 1 - Validar o campo de idade para apenas 2 caracteres
  }

  updateUserProfile(payload: any): void {
    const apiUrl = `${customSettings.apiUrl}/users`;
    this.loading = true;

    this.http.put(apiUrl, payload).subscribe(
      (response) => {
        this.loading = false;
        this.editMode = !this.editMode;
        (localStorage.setItem('user', JSON.stringify({ ...payload, createdDate: this.user.createdDate })));
        const messageSucess = "Seu perfil foi atualizado com sucesso!";
        const titleSucess = `Parabéns, <strong>${payload.name}</strong>!`;
        this.openModalInfo(
          this.imageSuccess,
          "Voltar",
          titleSucess,
          messageSucess
        );

      },
      (error) => {
        this.loading = false;
        this.editMode = true;
        const messageError = this.handleErrorUpdateProfile(error.message);
        this.openModalInfo(
          this.imageError,
          "Voltar",
          "Erro",
          messageError
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
  }

  handleErrorUpdateProfile(error: any): string {
    console.error("Erro nao tratado ", error);
    return "Ocorreu um erro na atualização do perfil, por favor tente novamente!";
  }
}
