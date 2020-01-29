import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ExamService } from '../exam.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  $questionPaperList:Observable<any>;

  constructor(private examService:ExamService) { }

  ngOnInit() {
    this.$questionPaperList = this.examService.getAllFields;
    this.$questionPaperList.subscribe(d=>{
      console.log(d)
    })
  }

}
