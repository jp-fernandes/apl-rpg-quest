import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
