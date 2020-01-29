import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ExamService {

  constructor(private afDB:AngularFireDatabase,private fb:FormBuilder,private auth:AngularFireAuth) { }

  pushQuestions(questions){
    this.afDB.object(`questions/${questions.questionPaperName}`).set(questions);
  }

  getQuestions(name){
    return this.afDB.object(`questions/${name}`).valueChanges();
  }

  get getAllQuestionPapers(){
    return this.afDB.list("questions").valueChanges();
  }

  get CurrentUser(){
    return this.auth.auth.currentUser;
  }

  get questionFormGroup(){
    return this.fb.group({
      question:["",[Validators.required]],
      options:this.fb.array([]),
      answer:["",[Validators.required]]
    })
  }

  get formGroupForFields(){
    return this.fb.group({
      fieldName:["",Validators.required],
      placeHolder:["",Validators.required],
      required:[false],
      pattern:[""]
    })
  }

  get optionFormGroup(){
    return this.fb.group({
      option:["",Validators.required]
    })
  }

  postFields(value){
    return this.afDB.object(`field/${value.url}`).set(value)
  }

  getFields(url){
    return this.afDB.object(`field/${url}`).valueChanges();
  }

  get getAllFields(){
    return this.afDB.list("field").valueChanges();
  }
  
  postAnswers(headerName,values){
    return this.afDB.object(`answers/${headerName}/${this.auth.auth.currentUser.uid}`).set(values)
  }

  updateAnswers(header,index,value){
    let obj = {};
    obj[index] = value;
    return this.afDB.object(`answers/${header}/${this.auth.auth.currentUser.uid}/answers`).update(obj)
  }
  
}
