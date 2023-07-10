import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';

@Component({
  selector: 'rpg-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm!: FormGroup;
  imageError: string = "/assets/images/modal/modal-error.svg"
  messageError: string = '';
  messageValid: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private matBottomSheet: MatBottomSheet,
    // private feedbackService: FeedbackService
  ) { }

  ngOnInit(): void {
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
      console.log("valores recebidos ", feedbackData);
      // this.feedbackService.sendFeedback(feedbackData).subscribe(
      //   (response) => {
      //     // Lógica de manipulação da resposta de sucesso, se necessário
      //   },
      //   (error) => {
      //     // Lógica de manipulação do erro, se necessário
      //   }
      // );
    } else {
      this.messageError = this.feedbackForm.value.suggestion == "" ? "Por favor, preencha o campo de sugestão.." : "Por favor, escolha uma nota";
      this.messageValid = true;
      // this.openModalInfo(
      //   this.imageError,
      //   "Ir para o login",
      //   "Ops!",
      //   messageError
      // );
    }
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
}
