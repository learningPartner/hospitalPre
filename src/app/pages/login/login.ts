import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../core/services/user-service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj: any = {
    projectName: '',
    email: '',
    password: '',
  };

  userSrv = inject(UserService);
  router = inject(Router);
  formSubmitted: boolean = false;


  login(form: NgForm) {
    this.formSubmitted = true;
    debugger;
    if(!form.invalid) {
      this.userSrv.onLogin(this.loginObj).subscribe({
      next:(res:any)=>{
         debugger;
        sessionStorage.setItem('hospitalUser',JSON.stringify(res));
        this.router.navigateByUrl('/admin/users')
      },
      error:(error: any)=>{
         debugger;
        alert("APi Error " + error.error)
      }
    })
    }
    
  }
}
