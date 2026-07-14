import { GlobalConstant } from "./GlobalConstant";

export const FormConstant = {
    STAFF_FORM_DATA: [
        {label: 'Full Name', inputType:'text',placeHolder:'Enter Full Name',fieldName:'fullName',className:'form-control'},
        {label: 'Email', inputType:'text',placeHolder:'Enter Email',fieldName:'email',className:'form-control'},
        {label: 'Mobile No', inputType:'text',placeHolder:'Enter Mobile No',fieldName:'mobileNo',className:'form-control'},
        {label: 'Password', inputType:'password',placeHolder:'Enter Password',fieldName:'password',className:'form-control'},
        {label: 'Role', inputType:'select',placeHolder:'Select Role',fieldName:'roleName',className:'form-control',options: GlobalConstant.ROLE_LIST},
        {label: 'Status', inputType:'checkbox',placeHolder:'Select Status',fieldName:'isActive',className:''},
    ]
}