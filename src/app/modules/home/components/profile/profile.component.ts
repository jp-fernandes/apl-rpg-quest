import { Component, OnInit } from '@angular/core';
import { IUserData } from 'src/app/modules/shared/models/userData';
import { getEmptyFields, handleMessage } from 'src/assets/config/utils';

@Component({
  selector: 'rpg-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: IUserData = {
    name: 'John',
    surname: 'Doe',
    age: 25,
    gender: 'Male',
    city: 'New York',
    state: 'NY'
  };
  editMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveProfile(): void {
    const payload: Record<string, any> = {
      age: this.user.age,
      name: this.user.name,
      surname: this.user.surname,
      gender: this.user.gender,
      city: this.user.city,
      state: this.user.state.toUpperCase()
    };

    const emptyFields = getEmptyFields(payload);

    if (emptyFields.length > 0) {
      const missingFieldsMessage = handleMessage(emptyFields);
      console.log('Informe o(s) Campo(s) vazio(s):', missingFieldsMessage);
      //To-Do
      // 1 - Exibir mensagem para o usuário informando os campos vazios
      return;
    } else {
      this.editMode = !this.editMode;
      console.log('Dados salvos:', payload);
      // Continuar com o salvamento dos dados
    }
    //To-Do
    // 1 - Fazer um get no user - Ver se precisa colocar LOADER
    // 2 - Enviar os dados para o serviço. - Ja tem servico pronto o Update User by Email
    // 3 - Colocar uma mensagem de sucesso
    // 4 - Validar o campo de idade para apenas 2 caracteres
  }
}
