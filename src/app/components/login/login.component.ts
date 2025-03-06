import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../models/user.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private user:UserService ,private router:Router, private toast:ToastrService){}
  loginform:FormGroup=new FormGroup(
    {
      username:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    
    }
  )
  login(){
    if(this.loginform.valid){
      this.user.login(this.loginform.value).subscribe({
        next:(respone)=>{
          console.log(this.loginform.value,respone);
          this.toast.success("Login Successful!") ; 
          this.router.navigate(['/cards']);
        },
        error:(error)=>{
          console.log('error',error);
          this.toast.error("Login Failed!") ; 
        }
      })

    }
  }

}
