import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExamComponent } from './exam/exam.component';
import { DemoMaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamService } from './exam.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AnswersComponent } from './exam/answers/answers.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { AuthGuard } from '../core/auth.guard';
import { QuillModule } from 'ngx-quill';
const routes:Routes=[
  {
    path:'',component:ExamListComponent
  },
  {
    path:":id",component:ExamComponent,canActivate:[AuthGuard]
  }
]

@NgModule({
  declarations: [ExamComponent,AnswersComponent, ExamListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    QuillModule.forRoot()
  ],
  providers:[ExamService,AuthGuard],
  entryComponents:[AnswersComponent]
})
export class PaperModule { }
