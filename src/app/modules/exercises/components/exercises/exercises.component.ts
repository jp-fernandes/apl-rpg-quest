import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rpg-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  question!: string;
  options!: string[];
  respostaSelecionada: string = '';
  respostaCorreta!: boolean | null;

  user: any = {
    pergunta: '',
    options: '',
  };

  // constructor(private firestore: AngularFirestore) {
  //   // this.firestore.collection('sua-colecao').doc('sua-pergunta-id').valueChanges().subscribe((data: any) => {
  //   //   this.pergunta = data.pergunta;
  //   //   this.opcoes = data.opcoes;
  //   // });
  // }

  constructor() {}

  ngOnInit(): void {
  }

  verificarResposta() {
    const respostaCorreta = 'resposta-correta';
    this.respostaCorreta = this.respostaSelecionada === respostaCorreta;
  }

}