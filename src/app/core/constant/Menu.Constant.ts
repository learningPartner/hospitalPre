import { GlobalConstant } from "./GlobalConstant";

export const MenuConstant = {
    menuItems: [
        { 
            title: 'Medicine',
            icon:'fa fa-user',
            route: 'medicine-Master',
            roles: [GlobalConstant.ROLE.DOCTOR,GlobalConstant.ROLE.RECEIPNEST]
        }, 
        {
            title: 'users',
            icon:'fa fa-user',
            route: 'users',
            roles: [GlobalConstant.ROLE.DOCTOR,GlobalConstant.ROLE.RECEIPNEST]
        } , 
        {
            title: 'precriptions',
            icon:'fa fa-user',
            route: 'users',
            roles: [GlobalConstant.ROLE.DOCTOR]
        }
    ]
}