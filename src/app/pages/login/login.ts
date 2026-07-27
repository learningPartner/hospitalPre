import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../core/services/user-service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginModel } from '../../core/models/classes/User.Model';
import { GlobalConstant } from '../../core/constant/GlobalConstant';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj: LoginModel = new LoginModel();

  userSrv = inject(UserService);
  router = inject(Router);
  formSubmitted: boolean = false;

  login(form: NgForm) {
    this.formSubmitted = true;
   
    if (!form.invalid) {
      this.userSrv.onLogin(this.loginObj).subscribe({
        next: (res: any) => {
         
          localStorage.setItem(GlobalConstant.TOKEN_KEY,res.token);
          sessionStorage.setItem(GlobalConstant.LOGGED_USER_SEESION_KEY, JSON.stringify(res.user));
          this.userSrv.assignLoogedUser();
          this.router.navigateByUrl('/admin/users');
        },
        error: (error: any) => {
         
          alert('APi Error ' + error.error);
        },
      });
    }
  }
}
