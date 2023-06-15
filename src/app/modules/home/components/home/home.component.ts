import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rpg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name = 'Nome da Pessoa';
  //To-Do
  // 1 - Buscar o nome da pessoa, talvez ver local storage ou outra coisa.

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  studyPaths(): void {
    // Navegue para a página de trilhas para estudo
    this.router.navigate(['/assuntos']);
  }

  takeExams(): void {
    //To-Do
    // 1 - Verificar se o usuário estudou algum conteúdo na página de "trilhas para estudo" - Só permitir fazer a prova se tiver feito isso.
    this.router.navigate(['/provas']);
  }

  restartFromZero(): void {
    //To-Do
    // Lógica para reiniciar o jogo do zero
    // perguntar se realmente quer de ctz reiniciar o jogo
  }

  viewCurrentPerformance(): void {
    // Navegue para a página de desempenho atual
    this.router.navigate(['/current-performance']);
  }

  viewProfile(): void {
    // Navegue para a página de perfil
    this.router.navigate(['/profile']);
  }

  viewGameRules(): void {
    // Navegue para a página de regras do jogo
    this.router.navigate(['/game-rules']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
