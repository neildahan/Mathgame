import { Component, Input, OnInit } from '@angular/core';
import { GameState } from '../models/game-state.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() gameScore?: GameState | null

  constructor() { }

  ngOnInit(): void {
  }

}
