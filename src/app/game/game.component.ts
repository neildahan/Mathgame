import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { MatDialog } from '@angular/material/dialog';
import { GameOverComponent } from '../shared/game-over/game-over.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {



  gameState$ = this.gameService.gameState$
  isSuccess = false
  isFailed = false
  isCounter = true

  constructor(private gameService: GameService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.gameService.startNewGame()
    this.stopCounter()
  }

  onSuccess() {
    this.gameService.updateGameStateProperty("score", ++this.gameService.gameState.score)
    this.gameService.updateGameStateProperty("numberOfSuccess", ++this.gameService.gameState.numberOfSuccess)
    if (this.gameService.gameState.numberOfSuccess % this.gameService.gameState.increaseMaxNumberCount == 0) {
      this.gameService.updateGameStateProperty("maxNumber", ++this.gameService.gameState.maxNumber)
    }
    if (this.gameService.gameState.numberOfSuccess % this.gameService.gameState.increaseQuestionNumberCount == 0)
      this.gameService.updateGameStateProperty("questionNumberCount", ++this.gameService.gameState.questionNumberCount)


    this.setSuccess()
  }

  setSuccess() {
    this.isSuccess = true
    setTimeout(() => {
      this.isSuccess = false
    }, 1000);
  }

  setFailed() {
    this.isFailed = true
    setTimeout(() => {
      this.isFailed = false
    }, 900);
  }

  onFailure() {
    this.setFailed()
  }

  onAnswerSelected(answer: number) {
    if (this.gameService.isAnswerCorrect(answer)) {
      this.onSuccess()
    }
    else {
      this.onFailure()
    }
    this.gameService.generateBoard()
  }

  startCounter() {
    this.isCounter = true
  }

  stopCounter() {
    setTimeout(() => {
      this.isCounter = false
    }, 4000);
  }

}
