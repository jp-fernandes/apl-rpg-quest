import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rpg-current-performance',
  templateUrl: './current-performance.component.html',
  styleUrls: ['./current-performance.component.scss']
})
export class CurrentPerformanceComponent implements OnInit {

  //to-do
  //mock - remover depois
  subjects = [
    { name: 'Matemática', progress: 80 },
    { name: 'Língua Portuguesa', progress: 60 },
    { name: 'Ciências Naturais', progress: 75 },
    { name: 'História', progress: 90 },
    { name: 'Geografia', progress: 70 }
  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  confirmSubjectSelection(option: any) {
    //to-do
    // 1 - verificar o que vai fazer com as options
    // 2 - ver a melhor forma do bind
    // 3 - criar nova tela para exibir os detalhes
    console.log(option)
    // this.chosenOption = option;
    // let optionTranslated = getTranslatedSubjectName(option);
    // const messageOfChoice = `Você escolheu: <strong>${optionTranslated}</strong>`;

    // this.openModalInfo(
    //   "",
    //   "Sim",
    //   "Não",
    //   "Tem certeza?",
    //   messageOfChoice,
    // );
  }


  goToHome() {
    this.router.navigate(['/home']);
  }

}
