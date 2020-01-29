import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ExamService } from '../../exam.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  answers : Observable<any>;
  // flag:boolean = false;
  constructor(public dialogRef: MatDialogRef<AnswersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private examService:ExamService) { }

  ngOnInit() {
    console.log(this.data)
    this.answers = this.examService.getQuestions(this.data["header"]).pipe(
      map((data)=>{
        let answer = data["questions"].filter((d,i)=>{
          if (d["answer"] == this.data["answers"]["answers"][i]) {
            return Object.assign(d,{output:"right"});
          }else{
            return Object.assign(d,{output:"wrong"});
          }
        })
        return answer;
      })
    )
  }

  checkAnswers(){

  }

}
