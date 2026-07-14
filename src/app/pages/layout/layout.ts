import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router'; 
import { LoginUserModel } from '../../core/models/interfaces/User.Model';
import { UserService } from '../../core/services/user-service';
import { MenuConstant } from '../../core/constant/Menu.Constant';

@Component({
  selector: 'app-layout',
  imports: [NgClass, RouterOutlet, RouterLink, ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  isSidebarExpanded: boolean = true;
  // loggedUserData: LoginUserModel = {
  //   email:'',
  //   fullName:'',
  //   id: 0,
  //   isActive:false,
  //   mobileNo:'',
  //   roleId:0,
  //   roleName:''
  // };
  userSrv = inject(UserService)
  loggedUserData!: LoginUserModel;
  router=  inject(Router);

  menuItemList =  MenuConstant.menuItems;

  cityList: string  [] = ["Pune","Panji","Nagput","Mumbai","Solapur","Thane"];


  constructor(){

    const data = this.cityList.includes("Pune"); 
    // const loggedData = sessionStorage.getItem("hospitalUser");
    // if(loggedData) {
    //   this.loggedUserData = JSON.parse(loggedData)
    // }
    debugger;
    this.loggedUserData= this.userSrv.loggedUserData;
  }

  onLogOff() {
    sessionStorage.removeItem('hospitalUser');
    this.router.navigate(['/login'])

  }

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
