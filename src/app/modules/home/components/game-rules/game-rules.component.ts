import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rpg-game-rules',
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss']
})
export class GameRulesComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  //To-do
  // 1 - Verificar como vai ficar a centralizacao da tela de regras
}
