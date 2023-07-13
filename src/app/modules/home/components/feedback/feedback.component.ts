import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import Images from 'src/app/modules/shared/enums/images.enum';
import { IUserData } from 'src/app/modules/shared/models/userData';
import { customSettings } from 'src/assets/config/customSettings';
import { getUserFromLocalStorage } from 'src/assets/config/utils';

@Component({
  selector: 'rpg-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
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

  feedbackForm!: FormGroup;
  imageError: string = Images.ERROR;
  imageSuccess: string = Images.SUCCESS;
  messageError: string = '';
  messageValid: boolean = false;
  loading: boolean = false;
  flagHome: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private matBottomSheet: MatBottomSheet,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.user = getUserFromLocalStorage();
    this.feedbackForm = this.formBuilder.group({
      rating: ['', Validators.required],
      suggestion: ['', Validators.required]
    });

  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  submitFeedback(): void {
    if (this.feedbackForm.valid) {
      this.messageError = "";
      this.messageValid = false;
      const feedbackData = this.feedbackForm.value;

      const payload = {
        rating: feedbackData.rating,
        suggestion: feedbackData.suggestion,
        name: this.user.name,
        surname: this.user.surname,
        email: this.user.email
      };

      this.callFeedback(payload);

    } else {
      this.messageError = this.feedbackForm.value.suggestion == "" ? "Por favor, preencha o campo de sugestão.." : "Por favor, escolha uma nota";
      this.messageValid = true;
    }
  }

  callFeedback(payload: any): void {
    const apiUrl = `${customSettings.apiUrl}/feedback`;
    this.loading = true;

    this.http.post(apiUrl, payload).subscribe(
      (response) => {
        this.loading = false;
        const messageSucess = "Seu feedback foi enviado com sucesso! Continue seu aprendizado no jogo!";
        const titleSucess = `<strong>Incrível!</strong>`;
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
        const messageError = "Ocorreu um erro no envio do seu feedback, por favor tente novamente!";
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
      .subscribe(x => {
        if (this.flagHome) {
          this.router.navigate(['/home']);
        }
      })
  }
}
