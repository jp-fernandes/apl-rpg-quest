import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rpg-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  onStartClick(): void {
    this.router.navigate(['/login']);
  }
}