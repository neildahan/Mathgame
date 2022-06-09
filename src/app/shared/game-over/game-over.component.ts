
import { Component, Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { GameService } from 'src/app/game/services/game.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent {
  constructor(public dialog: MatDialog, public gameService: GameService) { }

  gameState = this.gameService.gameState$


  restartGame(){
    this.dialog.closeAll()
    this.gameService.startNewGame()
    
  }
}
