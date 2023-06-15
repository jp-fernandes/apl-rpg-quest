import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ModalInfoComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatBottomSheetModule
  ]
})
export class SharedModule { }