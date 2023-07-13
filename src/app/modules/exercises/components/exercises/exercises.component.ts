import { Component, OnInit } from '@angular/core';

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
  questions: any[] = [];
  totalScore = 0;

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

      this.answersSubmitted = true;

      if (this.isLastPage()) {
        this.sendAnswersToFirestore();
      }
    }
  }

  nextPage() {
    // Avançar para a próxima página de perguntas
    this.currentPageIndex++;
    this.answersSubmitted = false;
  }

  isLastPage(): boolean {
    const lastPageIndex = Math.ceil(this.questions.length / this.questionsPerPage) - 1;
    return this.currentPageIndex === lastPageIndex;
  }

  loadQuestions() {
    // Lógica para obter as perguntas do serviço (exemplo: Firestore)
    // Substitua pelo seu código de obtenção das perguntas
    this.questions = [
      {
        text: 'Qual é a capital do Brasil?',
        options: ['Rio de Janeiro', 'Brasília', 'São Paulo', 'Salvador'],
        correctAnswer: 'Brasília',
        selectedAnswer: null
      },
      {
        text: 'Qual é a cor do céu em um dia ensolarado?',
        options: ['Azul', 'Vermelho', 'Verde', 'Amarelo'],
        correctAnswer: 'Azul',
        selectedAnswer: null
      },
      {
        text: 'Qual é o maior rio do mundo?',
        options: ['Nilo', 'Amazonas', 'Mississippi', 'Yangtzé'],
        correctAnswer: 'Amazonas',
        selectedAnswer: null
      },
      {
        text: 'Qual é a moeda oficial do Japão?',
        options: ['Iene', 'Dólar', 'Euro', 'Real'],
        correctAnswer: 'Iene',
        selectedAnswer: null
      },
      // Adicione mais perguntas aqui...
    ];
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
