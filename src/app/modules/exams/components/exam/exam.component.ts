import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import Images from 'src/app/modules/shared/enums/images.enum';
import { IPerformanceData } from 'src/app/modules/shared/models/performanceData';
import { IQuestion } from 'src/app/modules/shared/models/question';
import { IUserData } from 'src/app/modules/shared/models/userData';
import { customSettings } from 'src/assets/config/customSettings';
import { getItemFromLocalStorage, getUserFromLocalStorage } from 'src/assets/config/utils';

@Component({
  selector: 'rpg-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
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
  localStorageKey = 'userScoreExam';
  questions: IQuestion[] = [];
  totalScoreExam = 0;
  totalScoreExercises = 0;
  loading: boolean = false;
  imageError: string = Images.ERROR;
  imageSuccess: string = Images.SUCCESS;
  email: string = '';
  subjectSelected: string = '';
  flagHome: boolean = false;
  warning: boolean = false;
  performanceData: IPerformanceData = {
    performance: []
  };

  constructor(
    private router: Router,
    private matBottomSheet: MatBottomSheet,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    //to-do
    // 1 - Tirar todas as regras do exercicio e mudar para regras de provas
    const inProgress = getItemFromLocalStorage('inProgress');
    this.subjectSelected = inProgress.chosenOption;
    this.user = getUserFromLocalStorage();
    this.email = this.user.email;
    this.loadPerformance();
    this.loadQuestions();
    this.loadTotalScoreExam();
  }

  loadPerformance() {
    const performanceData = getItemFromLocalStorage('performanceData');
    if (performanceData) {
      this.performanceData = performanceData;
      this.totalScoreExercises = this.getScoreExercisesBySubject(this.subjectSelected, performanceData);
    } else {
      this.callGetPerformance();
    }
  }

  getScoreExercisesBySubject(subject: string, performanceData: IPerformanceData): number {
    const performance = performanceData.performance;
    const subjectPerformance = performance.find((item) => item.subject === subject);
    return subjectPerformance ? subjectPerformance.exercises : 0;
  }

  callGetPerformance(): void {
    const apiUrl = `${customSettings.apiUrl}/performance/${encodeURIComponent(this.email)}`;

    this.http.get<{ message: string, performanceData: IPerformanceData }>(apiUrl)
      .subscribe(
        (response) => {
          if (response.performanceData) {
            this.performanceData = response.performanceData;
            this.totalScoreExercises = this.getScoreExercisesBySubject(this.subjectSelected, this.performanceData);
          } else {
            this.performanceData = { performance: [] };
          }
          localStorage.setItem('performanceData', JSON.stringify(this.performanceData));
        },
        (error) => {
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
      this.totalScoreExam += pageScore;
      localStorage.setItem(this.localStorageKey, String(this.totalScoreExam));
      localStorage.setItem('partialExercises', 'true');

      this.answersSubmitted = true;

      if (this.isLastPage()) {
        this.sendAnswersExamToFirestore();
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
    this.callGetQuestionsExams();
  }

  callGetQuestionsExams(): void {
    this.loading = true;

    const apiUrl = `${customSettings.apiUrl}/exams/${encodeURIComponent(this.subjectSelected)}`;

    this.http.get<IQuestion[]>(apiUrl)
      .subscribe(
        (response) => {
          this.loading = false;
          this.questions = response;
        },
        (error) => {
          // to-do
          // 1 - se dê erro zerar o local storage da materia em andamento para ele poder entrar aqui de novo
          // 2 - avaliar no endpoint de respostas tbm. zerar os dados dele para o score ficar zeradinho
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

  loadTotalScoreExam() {
    const totalScoreString = localStorage.getItem(this.localStorageKey);
    if (totalScoreString) {
      this.totalScoreExam = parseFloat(totalScoreString);
    }
  }

  sendAnswersExamToFirestore() {
    this.loadTotalScoreExam();

    const payload = {
      email: this.email,
      subject: this.subjectSelected,
      progress: 100,
      exercises: this.totalScoreExercises,
      exam: this.totalScoreExam
    };

    //to-do
    // 1 - zerar do local storage a performance
    this.callSavePerformance(payload);
    this.callSaveStatus();
  }

  callSavePerformance(payload: any): void {
    const apiUrl = `${customSettings.apiUrl}/performance`;
    this.loading = true;
    this.flagHome = true;

    this.http.post(apiUrl, payload).subscribe(
      (response) => {
        this.loading = false;
        const titleSucess = `<strong>Sua nota foi: ${this.totalScoreExam}</strong>`;
        const messageSucess = this.getScoreMessage(this.totalScoreExam);

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
      score: this.totalScoreExam,
      subject: this.subjectSelected
    }

    const apiUrl = `${customSettings.apiUrl}/subjects/status`;
    this.loading = true;
    this.flagHome = true;

    this.http.post(apiUrl, payloadStatus).subscribe(
      (response) => {
        this.loading = false;
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

  //to-do
  //1 - mudar mensagens de aprovacao ou reprovacao
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
