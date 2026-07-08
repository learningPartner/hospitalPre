import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NgClass],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  isSidebarExpanded: boolean = true;
  loggedUserData: any;
  router=  inject(Router);

  constructor(){
    const loggedData = sessionStorage.getItem("hospitalUser");
    if(loggedData) {
      this.loggedUserData = JSON.parse(loggedData)
    }
  }

  onLogOff() {
    sessionStorage.removeItem('hospitalUser');
    this.router.navigate(['/login'])

  }

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
