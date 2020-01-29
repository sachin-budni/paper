import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  loginFormGroup:FormGroup;
  forgetEmail:string;
  forgetPassword:FormGroup;
  flag : boolean = true;
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  constructor(private fBuilder : FormBuilder,private authService:LoginService,private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
    let passwordRegex: RegExp = /((?=.*\d)(?=.*[a-zA-Z]).{8,20})/ 
    this.loginFormGroup = this.fBuilder.group({
      "email":[null,[Validators.required,Validators.pattern(this.emailregex)]],
      "password":[null,[Validators.required,Validators.pattern(passwordRegex)]]
    });

    this.forgetPassword = this.fBuilder.group({
      forgotEmail:[null,[Validators.required,Validators.pattern(this.emailregex)]]
    })
  }

  getErrorPassword() {
    return this.loginFormGroup.get('password').hasError('required') ? 'Field is required' :
      this.loginFormGroup.get('password').hasError('pattern') ? 'Not a valid password' :'';
  }

  getErrorEmail(mail) {
    if(mail == 'email'){
      return this.loginFormGroup.get(mail).hasError('required') ? 'Field is required' :
        this.loginFormGroup.get(mail).hasError('pattern') ? 'Not a valid emailaddress' :'';
          // this.loginFormGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : ''
    }else{
      return this.forgetPassword.get(mail).hasError('required') ? 'Field is required' :
        this.forgetPassword.get(mail).hasError('pattern') ? 'Not a valid emailaddress' :'';
          // this.loginFormGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : ''    
    }
  }

  onSubmit(data){
    this.authService.logIn(data).catch(err=>{ 
      alert(err.message);
    });
  }
  GoogleLogin(){
    this.authService.googleLogin();
  }

  resetPassword(){
    this.flag = false;
  }
  forgetPasswordSubmit(email){
    this.authService.resetPassword(email).then(()=>{
      alert("mail has been sent");
      this.flag = true;
    }).catch(err=>{
      alert(err['message'])
    })
  }  

}
