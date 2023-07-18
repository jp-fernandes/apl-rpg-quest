import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ModalInfoComponent } from 'src/app/modules/shared/components/modal-info/modal-info.component';
import Images from 'src/app/modules/shared/enums/images.enum';
import { IPerformanceData } from 'src/app/modules/shared/models/performanceData';
import { IUserData } from 'src/app/modules/shared/models/userData';
import { customSettings } from 'src/assets/config/customSettings';
import { getUserFromLocalStorage, getTranslatedSubjectName, getItemFromLocalStorage } from 'src/assets/config/utils';

@Component({
  selector: 'rpg-current-performance',
  templateUrl: './current-performance.component.html',
  styleUrls: ['./current-performance.component.scss']
})
export class CurrentPerformanceComponent implements OnInit {
  user: IUserData = {
    email: '',
    name: '',
    surname: '',
    age: 0,
    gender: '',
    city: '',
    state: '',
    createdDate: ''
  };
  imageError: string = Images.ERROR;
  loading: boolean = false;
  email: string = '';
  performanceData: IPerformanceData = {
    performance: []
  };

  private subjectIconsMap: { [key: string]: string } = {
    mathematics: 'fa-calculator',
    portuguese: 'fa-book',
    sciences: 'fa-flask',
    history: 'fa-landmark',
    geography: 'fa-globe'
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private matBottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.user = getUserFromLocalStorage();
    this.email = this.user.email;

    const performanceData = getItemFromLocalStorage('performanceData');
    if (performanceData) {
      this.performanceData = performanceData;
    } else {
      this.callGetPerformance();
    }
  }

  callGetPerformance(): void {
    this.loading = true;
    const apiUrl = `${customSettings.apiUrl}/performance/${encodeURIComponent(this.email)}`;

    this.http.get<{ message: string, performanceData: IPerformanceData }>(apiUrl)
      .subscribe(
        (response) => {
          this.loading = false;
          if (response.performanceData) {
            this.performanceData = response.performanceData;
          } else {
            this.performanceData = { performance: [] };
          }
          localStorage.setItem('performanceData', JSON.stringify(this.performanceData));
        },
        (error) => {
          this.loading = false;
          const messageError = error && error.error && error.error.message || "Ocorreu um erro, por favor tente novamente!";
          this.openModalInfo(
            this.imageError,
            "Voltar",
            "Erro",
            messageError
          );
        }
      );
  }

  openModalInfo(image: string, buttonText: string, title: string, text: string) {
    this.matBottomSheet.open(ModalInfoComponent, {
      data: {
        image: image,
        buttonText: buttonText,
        title: title,
        text: text
      },
      panelClass: 'container-modal'
    })
      .afterDismissed()
  }

  confirmSubjectSelection(performance: any): void {
    performance.subject = this.translatedSubjectName(performance.subject);
    this.router.navigate(['/performance-details'], { state: { obj: performance } });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  getItemIconClass(subject: string): string {
    return `fas ${this.subjectIconsMap[subject]}`;
  }

  translatedSubjectName(subject: string): string {
    let optionTranslated = getTranslatedSubjectName(subject);
    return optionTranslated;
  }

}
