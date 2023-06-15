import { Inject, Component, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'rpg-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent implements OnInit {
  buttonText!: string;

  constructor(
    private matBottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      image: string;
      title: string;
      text: string;
      buttonText: string;
    }
  ) { }

  ngOnInit(): void {
    this.buttonText = this.data.buttonText || "Voltar"
  }

  closeModal() {
    this.matBottomSheet.dismiss();
  }

}