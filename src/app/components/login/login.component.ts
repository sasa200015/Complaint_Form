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
      UserName:new FormControl('',[Validators.required]),
      Password:new FormControl('',[Validators.required]),
    }
  )

  login() {
    if (this.loginform.valid) {
      this.user.login(this.loginform.value).subscribe({
        next: (response) => {  
          if (response.token) {  // Ensure the response contains a token
            localStorage.setItem('token', response.token); // Store token
            this.toast.success("Login Successful!"); 
            this.router.navigate(['/cards']); // Redirect to CardsComponent
          } else {
            this.toast.error("Login Failed, Invalid Response from Server");
          }
        },
        error: (error) => {
          console.log('error', error);
          this.toast.error("Login Failed, Username or Password Incorrect"); 
        }
      });
    }
  }
  

}
