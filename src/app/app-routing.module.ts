import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './modules/initiation/components/welcome/welcome.component';
import { LoginComponent } from './modules/core/authentication/components/login/login.component';
import { RegisterComponent } from './modules/core/authentication/components/register/register.component';
import { ForgetPasswordComponent } from './modules/core/authentication/components/forget-password/forget-password.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { CreateProfileComponent } from './modules/home/components/create-profile/create-profile.component';
import { GameRulesComponent } from './modules/home/components/game-rules/game-rules.component';
import { ProfileComponent } from './modules/home/components/profile/profile.component';
import { CurrentPerformanceComponent } from './modules/home/components/current-performance/current-performance.component';
import { ExamsComponent } from './modules/home/components/exams/exams.component';
import { StudyComponent } from './modules/home/components/study/study.component';
import { SubjectOverviewComponent } from './modules/home/components/subject-overview/subject-overview.component';
import { FeedbackComponent } from './modules/home/components/feedback/feedback.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'create-profile', component: CreateProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'study', component: StudyComponent },
  { path: 'subject-overview', component: SubjectOverviewComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'current-performance', component: CurrentPerformanceComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'game-rules', component: GameRulesComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
