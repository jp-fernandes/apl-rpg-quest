import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { appSettings } from 'app-settings';

@Component({
  selector: 'rpg-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  email!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      console.log('Email recebido:', this.email);
    });
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

    const payload = {
      age: ageNumber,
      name,
      surname,
      gender,
      city,
      state,
      email: this.email
    };

    this.createUserProfile(payload);
  }

  createUserProfile(payload: any): void {
    const apiUrl = `${appSettings.apiUrl}/users`;

    this.http.post(apiUrl, payload).subscribe(
      (response) => {
        console.log('Perfil criado com sucesso:', response);
        //To-do
        // 1 - Colocar uma mensagem de sucesso
        this.router.navigate(['/home']);
      },
      (error) => {
        //To-do
        // 1 - Colocar uma modal para exibir uma mensagem de erro ao usuário informando o erro ocorrido
        console.log(this.handleErrorCreateProfile(error));
      }
    );
  }

  handleErrorCreateProfile(error: any): void {
    if (error && error.error && error.error.code == "409" || error && error.error && error.error.error == "Usuário já existe") {
      error = "Usuário já existe!"
    } else {
      error = "Erro ao criar perfil não tratado";
    }
    return error;
  }
}