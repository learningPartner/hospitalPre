import { GlobalConstant } from "./GlobalConstant";

export const MenuConstant = {
    menuItems: [
        { 
            title: 'Medicine',
            icon:'fa-address-book-o',
            route: 'medicine-Master',
            roles: [GlobalConstant.ROLE.DOCTOR,GlobalConstant.ROLE.ADMIN],
            toolTipText: 'Medicine MAster PAge'
        }, 
        {
            title: 'users',
            icon:'fa-home',
            route: 'users',
            roles: [GlobalConstant.ROLE.DOCTOR,GlobalConstant.ROLE.RECEIPNEST, GlobalConstant.ROLE.ADMIN],
             toolTipText: 'User MAster PAge'
        } , 
        {
            title: 'precriptions',
            icon:'fa-phone',
            route: 'users',
            roles: [GlobalConstant.ROLE.DOCTOR],
             toolTipText: 'Precription'
        }, 
        {
            title: 'Visits',
            icon:'fa-phone',
            route: 'visit',
            roles: [GlobalConstant.ROLE.DOCTOR,GlobalConstant.ROLE.RECEIPNEST, GlobalConstant.ROLE.ADMIN],
             toolTipText: 'Precription'
        }
    ]
}
