import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './modules/initiation/components/welcome/welcome.component';
import { LoginComponent } from './modules/core/authentication/components/login/login.component';
import { RegisterComponent } from './modules/core/authentication/components/register/register.component';
import { ForgetPasswordComponent } from './modules/core/authentication/components/forget-password/forget-password.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { CreateProfileComponent } from './modules/home/components/create-profile/create-profile.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'create-profile', component: CreateProfileComponent },
  { path: 'home', component: HomeComponent }
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
