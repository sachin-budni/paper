import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AdminService {

  constructor(private afDB:AngularFireDatabase,private fb:FormBuilder,private auth:AngularFireAuth) { }

  pushQuestions(questions){
    return this.afDB.object(`questions/${questions.questionPaperName}`).set(questions);
  }

  getQuestions(name){
    return this.afDB.object(`questions/${name}`).valueChanges();
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
    return this.afDB.object(`field/${value.url.replace(/ /g,/-/)}`).set(value);
  }

  getFields(url){
    return this.afDB.object(`field/${url}`).valueChanges();
  }
  
  postAnswers(values,headerName){
    return this.afDB.object(`answers/${this.auth.auth.currentUser.uid}+${headerName.toLowerCase().replace(/ /g,/-/)}`).set(values)
  }

  
}
