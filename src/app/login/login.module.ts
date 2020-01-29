import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../core/login.service';
import { DemoMaterialModule } from '../material.module';

const routes:Routes=[
  {
    path:"",component:LoginComponent
  }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    ReactiveFormsModule,
    DemoMaterialModule
  ],
  providers:[LoginService]
})
export class LoginModule { }
