import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Users } from './pages/users/users';
import { MedicinesMaster } from './pages/medicines-master/medicines-master';
import { RegisterPatient } from './pages/patient/register-patient/register-patient';
import { PatientList } from './pages/patient/patient-list/patient-list';
import { Visits } from './pages/visits/visits';
import { roleBasedAccessGuard } from './core/guards/role-based-access-guard';
import { NoRoleAccess } from './pages/no-role-access/no-role-access';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component: Login
    },
    {
        path:'register-patient',
        component:RegisterPatient
    },
    {
        path:'admin',
        component: Layout,
        
        children:[
            {
                path:'users',
                component: Users,
                canActivate:[roleBasedAccessGuard],
            },
            {
                path:'medicine-Master',
                component: MedicinesMaster,
                canActivate:[roleBasedAccessGuard],
            },
            {
                path:'patient-list',
                component: PatientList,
                canActivate:[roleBasedAccessGuard],
            },
            {
                path:'visit',
                component: Visits,
                canActivate:[roleBasedAccessGuard],
            },
            {
                path:'no-access',
                component: NoRoleAccess
            }
        ]
    }
];
