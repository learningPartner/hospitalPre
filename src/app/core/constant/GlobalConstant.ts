export const GlobalConstant = {
    API_METHODS: {
        LOGIN:'login',
        CREATE_USER:'staff',
        FILTER_USER:'staff?roleName=',
        PATIENT:'patients',
        GET_PATIENT_BY_ID:'patients/',
        VISIT:'visits'
    },
    REG_EXP: {
        EAMIL:'/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
        PAN_CARD:'/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/'
    },
    VALIDATION_MESSAGE: {
        REQUIRED:'This Is Required',
        EMAIL:'Email Is inValid'
    },
    LOGGED_USER_SEESION_KEY:'hospitalUser',
    MEDICINE_FORM_LIST: [
        "Tablet",
        "Capsule",
        "Syrup",
        "Injection"
    ],
    ROLE:{
        DOCTOR:'Doctor',
        ADMIN:'Admin',
        RECEIPNEST:'Receptionist'
    },
    ROLE_LIST: ['Doctor','Patient','Receptionist']
}
