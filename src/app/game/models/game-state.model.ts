import { GameSettings } from "./game-settings";
import { Question } from "./question";

export class GameState {
    minNumber!: number;
    maxNumber!: number;
    questionNumberCount!: number;
    level!: number;
    score!: number;
    numberOfSuccess!:number;
    numberOfAnswers!: number;
    currentQuestion!: Question;
    currentAnswers!: number[];
    increaseMaxNumberCount:number;
    gameTime:number;
    increaseQuestionNumberCount:number;

        constructor(gameSettings: GameSettings) {

    this.minNumber = gameSettings.minNumber;
    this.maxNumber = gameSettings.maxNumber;
    this.numberOfAnswers = gameSettings.numberOfAnswers;
    this.questionNumberCount = gameSettings.questionNumberCount;
    this.increaseMaxNumberCount = gameSettings.increaseMaxNumberCount;
    this.increaseQuestionNumberCount = gameSettings.increaseQuestionNumberCount;
    this.level = 1;
    this.score = 0;
    this.numberOfSuccess = 0;
    this.gameTime = gameSettings.gameTime
}

}
