import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MaxTwoDigitsDirective } from './directives/max-two-digits-directive.directive';

@NgModule({
  declarations: [
    ModalInfoComponent,
    MaxTwoDigitsDirective
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatBottomSheetModule
  ],
  exports: [
    MaxTwoDigitsDirective
  ]
})
export class SharedModule { }
