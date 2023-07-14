import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import Images from 'src/app/modules/shared/enums/images.enum';
import { Question } from 'src/app/modules/shared/models/question';
import { customSettings } from 'src/assets/config/customSettings';

@Component({
  selector: 'rpg-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  answersSubmitted = false;
  currentPageIndex = 0;
  questionsPerPage = 2;
  localStorageKey = 'userScore';
  questions: Question[] = [];
  totalScore = 0;
  loading: boolean = false;
  imageError: string = Images.ERROR;;

  constructor(
    private router: Router,
    private matBottomSheet: MatBottomSheet,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadQuestions();
    this.loadTotalScore();
  }

  get currentQuestions(): any[] {
    const startIndex = this.currentPageIndex * this.questionsPerPage;
    const endIndex = startIndex + this.questionsPerPage;
    return this.questions.slice(startIndex, endIndex);
  }

  submitAnswers() {
    if (!this.answersSubmitted) {
      console.log(this.currentQuestions);
      // Lógica para processar as respostas selecionadas
      let pageScore = 0;
      this.currentQuestions.forEach((question) => {
        if (question.selectedAnswer === question.correctAnswer) {
          pageScore += 0.5;
        }
      });
      this.totalScore += pageScore;
      localStorage.setItem(this.localStorageKey, String(this.totalScore));
      localStorage.setItem('partialExercises', 'true');

      this.answersSubmitted = true;

      if (this.isLastPage()) {
        this.sendAnswersToFirestore();
      }
    }
  }

  nextPage() {
    this.currentPageIndex++;
    this.answersSubmitted = false;
  }

  isLastPage(): boolean {
    const lastPageIndex = Math.ceil(this.questions.length / this.questionsPerPage) - 1;
    return this.currentPageIndex === lastPageIndex;
  }

  loadQuestions() {
    this.callGetQuestions();
  }

  callGetQuestions(): void {
    this.loading = true;
    //TO-DO:
    // 1 - VERIFICAR SE VAI PRECISAR DE LOADER - precisa sim. e colocar a tela branca
    // 2 - Vai ganhar novo parametro para subject
    const apiUrl = `${customSettings.apiUrl}/exercises`;

    this.http.get<Question[]>(apiUrl)
      .subscribe(
        (response) => {
          this.loading = false;
          this.questions = response;
        },
        (error) => {
          this.loading = false;
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

  loadTotalScore() {
    const totalScoreString = localStorage.getItem(this.localStorageKey);
    if (totalScoreString) {
      this.totalScore = parseFloat(totalScoreString);
    }
  }

  sendAnswersToFirestore() {
    // Lógica para enviar as respostas para o Firestore
    // Substitua pelo seu código de envio das respostas
    console.log('Enviando respostas para o Firestore...');
  }

  getQuestionFeedback(question: any): string {
    if (question.selectedAnswer === question.correctAnswer) {
      return 'Parabéns, você acertou!';
    } else {
      return 'Resposta incorreta';
    }
  }

  isCorrect(question: any): boolean {
    return question.selectedAnswer === question.correctAnswer;
  }
}
