import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user-service';
import { GlobalConstant } from '../../core/constant/GlobalConstant';

@Directive({
  selector: '[appHideShowBtn]',
})
export class HideShowBtn implements OnInit {

  userSr =  inject(UserService);

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    if(this.userSr.loggedUserData.roleName !== GlobalConstant.ROLE.RECEIPNEST) {
      this.elementRef.nativeElement.style.display = "none";
    }
  }

}
