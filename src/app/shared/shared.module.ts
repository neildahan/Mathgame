import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameOverComponent } from './game-over/game-over.component';
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { HomeComponent } from './home/home.component';
import { LoginErrorComponent } from './login-error/login-error.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

@NgModule({
  declarations: [
    CardComponent,
    GameOverComponent,
    HomeComponent,
    LoginErrorComponent,
  ],

  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LottieModule
  ],

  exports: [
    CardComponent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HomeComponent,
    LottieModule
  ]
})
export class SharedModule { }
