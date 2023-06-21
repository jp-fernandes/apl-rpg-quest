import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subject-overview',
  templateUrl: './subject-overview.component.html',
  styleUrls: ['./subject-overview.component.scss']
})
export class SubjectOverviewComponent implements OnInit {
  chosenOption!: string;
  title!: string;
  overview!: string;
  subTopics: string[] = [];

  constructor(
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.chosenOption = window.history.state && window.history.state.chosenOption;
    console.log("opcao recebida ", this.chosenOption)

    if (this.chosenOption) {
      const subjectData = this.subjectService.getSubjectData(this.chosenOption);

      if (subjectData) {
        this.title = subjectData.title;
        this.overview = subjectData.overview;
        this.subTopics = subjectData.subTopics;
      }
    } else {
      // Redirecionar para a página inicial se a opção escolhida não for válida
      // ... faça a implementação adequada para redirecionar para a página inicial
    }

    //To-do
    // 1 - Validar essa PROP this.chosenOption pq caso atualizem a pagina direcionar para a home.
  }

}
