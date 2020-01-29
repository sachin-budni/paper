import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './core/admin.guard';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  {
    path:"admin",
    loadChildren:()=>import("./admin/admin.module").then(m=>m.AdminModule),
    canActivate:[AdminGuard]
  },
  {
    path:"login",
    loadChildren:()=>import("./login/login.module").then(m=>m.LoginModule)
  },
  {
    path:"signup",
    loadChildren:()=>import("./signup/signup.module").then(m=>m.SignupModule)
  },
  {
    path:"paper",
    loadChildren:()=>import("./paper/paper.module").then(m=>m.PaperModule),
  },
  {
    path:"",redirectTo:"paper",pathMatch:"full"
  },
  {
    path:"**",redirectTo:"paper",pathMatch:"full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
