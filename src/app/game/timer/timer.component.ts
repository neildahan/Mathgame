import { Component, Input, OnInit } from '@angular/core';
import { GameState } from '../models/game-state.model';
import { Question } from '../models/question';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() gameScore?: GameState | null
  // gameState$ = this.gameService.gameState$

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

}
