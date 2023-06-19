import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameRulesComponent } from './components/game-rules/game-rules.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CurrentPerformanceComponent } from './components/current-performance/current-performance.component';
import { ExamsComponent } from './components/exams/exams.component';
import { StudyComponent } from './components/study/study.component';
import { SharedModule } from '../shared/shared.module';
import { SubjectOverviewComponent } from './components/subject-overview/subject-overview.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateProfileComponent,
    GameRulesComponent,
    ProfileComponent,
    CurrentPerformanceComponent,
    ExamsComponent,
    StudyComponent,
    SubjectOverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HomeModule { }
