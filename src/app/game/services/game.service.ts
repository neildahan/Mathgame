import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, filter, interval, map, Observable, pipe, takeUntil, takeWhile } from 'rxjs';
import { BaseResponse } from 'src/app/models/base-response.interface';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GameOverComponent } from 'src/app/shared/game-over/game-over.component';
import { environment } from 'src/environments/environment';
import { GameComponent } from '../game.component';
import { GameSettings } from '../models/game-settings';
import { GameState } from '../models/game-state.model';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  id = 1
  userId = this.authService.user$.subscribe()
  // .pipe(map(data => {
  //   return data
  // })).subscribe(data => {
  //   return data
  // })

  private settings: GameSettings = {
    minNumber: 0,
    maxNumber: 3,
    questionNumberCount: 2,
    numberOfAnswers: 4,
    increaseMaxNumberCount: 5,
    gameTime: 10,
    increaseQuestionNumberCount: 10
  }

  private gameStateChange = new BehaviorSubject<GameState>(new GameState(this.settings))
  gameState$ = this.gameStateChange.asObservable()

  private isGameOverChange = new BehaviorSubject<boolean>(false);
  isGameOver$ = this.isGameOverChange.asObservable();

  constructor(private dialog: MatDialog, private http: HttpClient, private authService: AuthService) { }

  startNewGame() {
    this.setGameState(new GameState(this.settings))
    this.generateBoard();
    // this.game.isCounter = true
    setTimeout(() => {
      this.initTimer();
    }, 3700);


    //   setTimeout(() => {
    //     this.isCountDown$ = false
    //   }, 4000);
  }

  generateBoard() {
    this.updateGameStateProperty("currentQuestion", this.generateAddQuestion())
    this.updateGameStateProperty("currentAnswers", this.generateAnswers())
  }

  generateNumber(min: number, max: number) {
    return +(Math.random() * (max - min) + min).toFixed();
  }

  setGameState(gameState: GameState) {
    this.gameStateChange.next(gameState)
  }

  get gameState() {
    return this.gameStateChange.value;
  }

  generateAddQuestion(): Question {
    const numbers: number[] = []
    for (let i = 0; i < this.gameState.questionNumberCount; i++) {
      const num: number = this.generateNumber(this.gameState.minNumber, this.gameState.maxNumber)
      numbers.push(num)
    }
    const question: string = numbers.map(n => ` ${n} +`).join("")

    console.log({
      numbers,
      answer: numbers.reduce(((a, b) => a + b), 0),
      question: question.substring(0, question.length - 1) + "=" + "?"
    });

    return {
      numbers,
      answer: numbers.reduce(((a, b) => a + b), 0),
      question: question.substring(0, question.length - 1) + "=" + " " + "?"
    }

  }

  updateGameStateProperty(key: keyof GameState, value: any) {
    this.setGameState({
      ...this.gameState,
      [key]: value
    })
  }

  generateAnswers(): number[] {
    const answers: number[] = []
    answers.push(this.gameState.currentQuestion.answer)
    for (let i = 0; i < this.gameState.numberOfAnswers - 1; i++) {
      const num: number = this.generateNumber(this.gameState.minNumber, this.gameState.maxNumber * 2)
      if (!answers.includes(num)) {
        answers.push(num)
      }
      else {
        i--
      }
    }
    return answers.sort((a, b) => a - b)
  }


  openGameOver() {
    this.dialog.open(GameOverComponent, { disableClose: true })

  }


  isAnswerCorrect(answer: number) {
    return this.gameState.currentQuestion.answer == answer
  }

  initTimer() {
    const subscription = interval(1000).pipe(
      map(t => {
        return this.gameState.gameTime
      }
      ),
      //  filter(t => t > 0)
    ).subscribe(t => {
      this.isGameOverChange.next(t <= 0)
      if (this.isGameOverChange.value) {
        subscription.unsubscribe()
        this.openGameOver()
        this.updateHighScore(this.id, this.gameState.score)
        console.log(this.gameState.score)
        console.log(this.id)
        // this.updateHighScore((this.user$ | async )?.userId,this.gameState.score)
      }
      else {
        this.updateGameStateProperty("gameTime", t - 1)
      }
    })

  }


  updateHighScore(userId: number, scoreRecord: number) {
    return this.http.put(environment.baseUrl + "users/updateScore", { userId, scoreRecord }).pipe(
      map(res => {
        return console.log(res)
      }))

  }

}
