import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  @Input() answers?: number[] | null
  @Input() isSuccess?: boolean | null
  @Input() isFailed?: boolean | null
  @Output() onSelected = new EventEmitter<number>()


  constructor() { }

  ngOnInit(): void {
  }

}
