import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AnswersComponent } from './answers/answers.component';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { ExamService } from '../exam.service';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  headerName: string;
  answers: string[] = [];
  $questions: Observable<any>;
  $headerNames: any;
  examFormGroup: FormGroup;
  allFields:[]=[];
  questionPaperName = "";
  headerData = {
    headerName:"",
    subHeader:""
  }

  questionPaper = {
    headerName:"",
    questionPaperName:"",
    subjectName:"",
    suggestion:""
  }
  constructor(private examService: ExamService, 
              private dialog: MatDialog, 
              private fb: FormBuilder, 
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(route => {
    if (route.id) {
        this.headerName = route.id;
        this.examService.getFields(route.id).subscribe((fieldsName)=>{

          if(fieldsName){
            this.headerData.headerName = fieldsName["url"].replace(/-/g," ");
            this.headerData.subHeader = fieldsName["subHeader"]
            this.allFields = fieldsName["fields"];
            this.allFields.forEach(all=>{
              this.examFormGroup.addControl(all["fieldName"],new FormControl(""));
              if (all["required"]) {
                this.examFormGroup.controls[all["fieldName"]].setValidators([Validators.required]);
              }
              if(all["pattern"] != ""){
                let reg = new RegExp(all["pattern"]);
                this.examFormGroup.controls[all["fieldName"]].setValidators([Validators.pattern(reg)]);
              }
            })
            this.questionPaperName = fieldsName["questionPaperName"];
            this.$questions = this.examService.getQuestions(fieldsName["questionPaperName"]);
            this.$questions.subscribe(data=>{
              console.log(data)
              this.questionPaper.headerName = data["headerName"];
              this.questionPaper.suggestion = data["suggestion"];
              this.questionPaper.questionPaperName = data["questionPaperName"];
              this.questionPaper.subjectName = data["subjectName"]
              if(data){
                for (let i = 0; i < data.questions.length; i++) {
                  this.getAnswerGroup.addControl(i.toString(),new FormControl(""))                  
                }
              }
            })
          }
        })
      }
    })

    this.examFormGroup = this.fb.group({
      answers:this.fb.group({})
    });
  }
  changeValue(event,index){
    this.examService.updateAnswers(this.headerName,index,event.value);
  }

  get getAnswerGroup(){
    return this.examFormGroup.get("answers") as FormGroup;
  }

  submitAnswers(){
    console.log(this.examFormGroup.value)
    const dialogRef = this.dialog.open(AnswersComponent,{
      data:{header:this.questionPaperName,answers:this.examFormGroup.value}
    })

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
}
