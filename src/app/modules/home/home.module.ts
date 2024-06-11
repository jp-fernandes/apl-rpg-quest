import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameRulesComponent } from './components/game-rules/game-rules.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudyComponent } from './components/study/study.component';
import { SharedModule } from '../shared/shared.module';
import { SubjectOverviewComponent } from './components/subject-overview/subject-overview.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { CurrentPerformanceModule } from '../current-performance/current-performance.module';
import { StoreHomeService } from './store/store-home.service';
import { StateHomeService } from './store/state-home.service';

@NgModule({
  declarations: [
    HomeComponent,
    CreateProfileComponent,
    GameRulesComponent,
    ProfileComponent,
    StudyComponent,
    SubjectOverviewComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CurrentPerformanceModule
  ],
  providers: [
    StoreHomeService,
    {
      provide: StateHomeService,
      useExisting: StoreHomeService,
    },
  ],
})
export class HomeModule { }
