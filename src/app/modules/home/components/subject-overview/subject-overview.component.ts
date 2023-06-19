import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject-overview',
  templateUrl: './subject-overview.component.html',
  styleUrls: ['./subject-overview.component.scss']
})
export class SubjectOverviewComponent implements OnInit {
  chosenOption!: string;

  constructor() { }

  ngOnInit(): void {
    this.chosenOption = window.history.state && window.history.state.chosenOption;
    console.log("opcao recebida ", this.chosenOption)

    //To-do
    // 1 - Validar essa PROP this.chosenOption pq caso atualizem a pagina direcionar para a home.
  }

}
