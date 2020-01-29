import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from './admin.service';
import { DemoMaterialModule } from '../material.module';
import { AdminExamComponent } from './admin-exam/admin-exam.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';

const route:Routes = [
  {
    path:"",component:AdminExamComponent
  }
]

@NgModule({
  declarations: [AdminExamComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    QuillModule.forRoot()
  ],
  providers:[AdminService]
})
export class AdminModule { }
