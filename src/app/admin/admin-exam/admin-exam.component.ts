import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material';
import { QuillConfig } from 'ngx-quill';


export class Questions{
  question:string;
  options:[];
  answer:string;
}

@Component({
  selector: 'app-admin-exam',
  templateUrl: './admin-exam.component.html',
  styleUrls: ['./admin-exam.component.scss']
})
export class AdminExamComponent implements OnInit {

  examFormGroup:FormGroup;
  selectedValue:number = 0;
  SelectOption:number = 0;
  answerOptions:any[]=[];

  // quillConfig:QuillConfig={
  //   modules:{
  //     toolbar:'toolbar'
  //   }
  // }

  quillConfig:QuillConfig ={
    modules:{
      toolbar:{
        container:[
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          ['blockquote', 'code-block'],            // custom button values
          [{ 'header': [1,2,3,4,5,6,false] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'size': ['10px', '20px', '80px'] }]
          ['clean']
        ]
      }
    }
  }

  examFieldFormGroup:FormGroup;

  constructor(private fb:FormBuilder,private examService:AdminService,
    private snackBar:MatSnackBar) {
  }

  ngOnInit() {
    this.examFormGroup = this.fb.group({
      subjectName:[""],
      headerName:[""],
      questionPaperName:[""],
      suggestion:[""],
      questions:this.fb.array([])
    })
    
    this.examFieldFormGroup = this.fb.group({
      url:["",Validators.required],
      fields:this.fb.array([this.examService.formGroupForFields]),
      subHeader:[""],
      questionPaperName:[""],
    })

    this.getQuestions.insert(this.selectedValue,this.examService.questionFormGroup)

    this.getOptions(0).insert(this.SelectOption,this.examService.optionFormGroup)
  }

  addField(){
    this.getFileds.insert(this.getFileds.length,this.examService.formGroupForFields);
  }


  removeField(fieldIndex){
    this.getFileds.removeAt(fieldIndex);
  }

  get getFileds(){
    return this.examFieldFormGroup.get("fields") as FormArray;
  }

  selectExamPaper(event){
    if(event.value){
      for (let i = 0; i < this.getQuestions.length; i++) {
        this.getQuestions.removeAt(i)
      }
      this.insertQuestiondata(event.value);
    }
  }

  insertQuestiondata(id){
    this.examService.getQuestions(id.toLowerCase().replace(" ","-")).subscribe((data:Questions[])=>{
      if(data){
        for (let i = 0; i < data.length; i++) {
          this.getQuestions.insert(i,this.examService.questionFormGroup);
          for (let j = 0; j < data[i].options.length; j++) {
            this.getOptions(i).insert(j,this.examService.optionFormGroup);
            this.getOptions(i).controls[j].setValue(data[i].options[j]);
          }
          this.answerOptions[i] = data[i].options;
          this.getQuestions.controls[i].setValue(data[i])
        }
      }
    });
  }

  getOptions(index):FormArray{
    return this.getQuestions.controls[index].get("options") as FormArray;
  }

  get getQuestions(){
    return this.examFormGroup.get("questions") as FormArray;
  }

  addOption(index){
    this.getOptions(index).insert(this.getOptions(index).length,this.examService.optionFormGroup)
  }

  addQuestion(){
    if(!this.examFormGroup.valid){
      alert("Please Fill Proper Question");
      return;
    }

    this.getQuestions.insert(this.getQuestions.length,this.examService.questionFormGroup);

    this.getOptions(this.getQuestions.length-1).insert(0,this.examService.optionFormGroup)
    
  }

  onSubmit(){
    if(!this.examFormGroup.valid){
      alert("Please Fill Proper Question");
      return;
    }
    this.examService.pushQuestions(this.examFormGroup.value).then(()=>{
      this.snackBarForForm();
    }).catch((er)=>{
      this.erroSnackBar();
    })
  }

  submitFields(){
    if(!this.examFieldFormGroup.valid){
      alert("Please Fill Proper Question");
      return;
    }
    this.examService.postFields(this.examFieldFormGroup.value).then(()=>{
     this.snackBarForForm();
    }).catch(err=>{
      this.erroSnackBar();
    })
  }

  snackBarForForm(){
    this.snackBar.open("Successfully Submitted Form","",{
      duration:2000,
      verticalPosition:'top'
    })
  }

  erroSnackBar(){
    this.snackBar.open("Error Submitted Form","",{
      duration:2000,
      verticalPosition:'top',
      panelClass:["mycsssnackbartest"]
    })
  }

  removeQuestion(index){
    this.getQuestions.removeAt(index);
    this.answerOptions.splice(index,1);
  }
  optionChangeValue(questionNumber,optionNumber,event){
    if(this.answerOptions[questionNumber]){
      this.answerOptions[questionNumber][optionNumber] = {option:event.target.value};
    }else{
      let data = [];
      data.push({option:event.target.value});
      this.answerOptions[questionNumber] = data; 
    }
  }
}
