import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { AnswersComponent } from './answers/answers.component';
import { QuestionComponent } from './question/question.component';
import { TimerComponent } from './timer/timer.component';
import { SharedModule } from '../shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { HeaderComponent } from './header/header.component';
import { GameOverComponent } from '../shared/game-over/game-over.component';
import { GameService } from './services/game.service';


@NgModule({
  declarations: [
    GameComponent,
    AnswersComponent,
    TimerComponent,
    QuestionComponent,
    HeaderComponent,
  ],
  
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
  ]
})
export class GameModule { }
