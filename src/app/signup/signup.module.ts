import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginService } from '../core/login.service';
import { DemoMaterialModule } from '../material.module';

const routes:Routes=[
  {
    path:"",component:SignupComponent
  }
]

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    ReactiveFormsModule,
    DemoMaterialModule
  ],
  providers:[LoginService]
})
export class SignupModule { }
