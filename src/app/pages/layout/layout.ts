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

  menuItemList:any[] =  [];

  cityList: string  [] = ["Pune","Panji","Nagput","Mumbai","Solapur","Thane"];


  constructor(){
    this.loggedUserData= this.userSrv.loggedUserData;
    
    const allMenuItems =   MenuConstant.menuItems;
    const roleWiseMenu =  allMenuItems.filter(m=>m.roles.includes(this.loggedUserData.roleName))
    debugger;
    this.menuItemList = roleWiseMenu;
    const data = this.cityList.includes("Pune"); 
    // const loggedData = sessionStorage.getItem("hospitalUser");
    // if(loggedData) {
    //   this.loggedUserData = JSON.parse(loggedData)
    // }
    debugger;
    
  }

  onLogOff() {
    sessionStorage.removeItem('hospitalUser');
    this.router.navigate(['/login'])

  }

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
