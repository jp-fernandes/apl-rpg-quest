import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    LoginComponent
  ],
})
export class AuthModule { }