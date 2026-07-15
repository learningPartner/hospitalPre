import { CanActivateFn, Router } from '@angular/router';
import { GlobalConstant } from '../constant/GlobalConstant';
import { MenuConstant } from '../constant/Menu.Constant';
import { inject } from '@angular/core';
import { UserService } from '../services/user-service';

export const roleBasedAccessGuard: CanActivateFn = (route, state) => {
  debugger;

  const userSr =  inject(UserService);
  const router = inject(Router);
  const strArray =  state.url.split("/");
  const routeName=  strArray[2];

  const menuItem =  MenuConstant.menuItems.find(m=>m.route == routeName);
  const isRoleExistInMenu =  menuItem?.roles.includes(userSr.loggedUserData.roleName);
  if(isRoleExistInMenu) {
     return true;
  } else {
    router.navigateByUrl("/admin/no-access")
    return false;
  }
 
};
