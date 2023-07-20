import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import Images from 'src/app/modules/shared/enums/images.enum';
import { IQuestion } from 'src/app/modules/shared/models/question';
import { IUserData } from 'src/app/modules/shared/models/userData';
import { customSettings } from 'src/assets/config/customSettings';
import { getItemFromLocalStorage, getUserFromLocalStorage } from 'src/assets/config/utils';

@Component({
  selector: 'rpg-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
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
  answersSubmitted = false;
  allQuestionsAnswered = false;
  currentPageIndex = 0;
  questionsPerPage = 2;
  localStorageKey = 'userScore';
  questions: IQuestion[] = [];
  totalScore = 0;
  loading: boolean = false;
  imageError: string = Images.ERROR;
  imageSuccess: string = Images.SUCCESS;
  email: string | undefined;
  subjectSelected: string = '';
  flagHome: boolean = false;
  warning: boolean = false;

  constructor(
    private router: Router,
    private matBottomSheet: MatBottomSheet,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const inProgress = getItemFromLocalStorage('inProgress');
    this.subjectSelected = inProgress.chosenOption;
    this.user = getUserFromLocalStorage();
    this.email = this.user.email;
    this.loadQuestions();
    this.loadTotalScore();
  }

  get currentQuestions(): any[] {
    const startIndex = this.currentPageIndex * this.questionsPerPage;
    const endIndex = startIndex + this.questionsPerPage;
    return this.questions.slice(startIndex, endIndex);
  }

  submitAnswers() {
    this.allQuestionsAnswered = this.currentQuestions.every(question => question.selectedAnswer);
    this.warning = this.allQuestionsAnswered ? false : true;

    if (this.warning) {
      return;
    }

    if (!this.answersSubmitted) {
      let pageScore = 0;
      this.currentQuestions.forEach((question) => {
        if (question.selectedAnswer === question.correctAnswer) {
          pageScore += 1;
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

  loadQuestions(): void {
    this.loading = true;

    const apiUrl = `${customSettings.apiUrl}/exercises/${encodeURIComponent(this.subjectSelected)}`;

    this.http.get<IQuestion[]>(apiUrl)
      .subscribe(
        (response) => {
          this.loading = false;
          this.questions = response;
        },
        (error) => {
          localStorage.removeItem('inProgress');
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
      .subscribe(x => {
        if (this.flagHome) {
          this.router.navigate(['/home']);
        }
      })
  }

  loadTotalScore() {
    const totalScoreString = localStorage.getItem(this.localStorageKey);
    if (totalScoreString) {
      this.totalScore = parseFloat(totalScoreString);
    }
  }

  sendAnswersToFirestore() {
    this.loadTotalScore();

    const payload = {
      email: this.email,
      subject: this.subjectSelected,
      progress: 50,
      exercises: this.totalScore
    };

    this.callSavePerformance(payload);
    this.callSaveStatus();
  }

  resetItensLocalStorage() {
    localStorage.removeItem('performanceData');
    localStorage.setItem('noData', 'false');
  }

  callSavePerformance(payload: any): void {
    const apiUrl = `${customSettings.apiUrl}/performance`;
    this.loading = true;
    this.flagHome = true;

    this.http.post(apiUrl, payload).subscribe(
      (response) => {
        this.loading = false;
        this.resetItensLocalStorage();
        const titleSucess = `<strong>Sua nota foi: ${this.totalScore}</strong>`;
        const messageSucess = this.getScoreMessage(this.totalScore);

        this.openModalInfo(
          this.imageSuccess,
          "Ir para home",
          titleSucess,
          messageSucess
        );
      },
      (error) => {
        this.loading = false;
        const messageError = error && error.error && error.error.message || "Ocorreu um erro, por favor tente novamente!";
        this.openModalInfo(
          this.imageError,
          "Ir para home",
          "Erro",
          messageError
        );
      }
    );
  }

  callSaveStatus(): void {

    const payloadStatus = {
      email: this.email,
      scoreExercises: this.totalScore,
      subject: this.subjectSelected
    }

    const apiUrl = `${customSettings.apiUrl}/subjects/status`;
    this.loading = true;
    this.flagHome = true;

    this.http.post(apiUrl, payloadStatus).subscribe(
      (response) => {
        this.loading = false;
        this.resetItensLocalStorage();
      },
      (error) => {
        this.loading = false;
        const messageError = error && error.error && error.error.message || "Ocorreu um erro, por favor tente novamente!";
        this.openModalInfo(
          this.imageError,
          "Ir para home",
          "Erro",
          messageError
        );
      }
    );
  }

  getScoreMessage(totalScore: number): string {
    switch (totalScore) {
      case 4:
        return `Parabéns, <strong>${this.user.name}</strong>! Excelente desempenho, você tirou a nota máxima!`;
      case 3:
        return `Muito bem, <strong>${this.user.name}</strong>! Você fez um bom trabalho e conseguiu uma ótima nota!`;
      case 2:
        return "Você está no caminho certo, continue praticando para melhorar sua nota!";
      case 1:
        return "Não desanime, você pode melhorar seu desempenho com mais dedicação!";
      case 0:
        return "Não se preocupe, é só o começo! Continue se esforçando para alcançar melhores resultados!";
      default:
        return "Parabéns pelo seu desempenho!";
    }
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
