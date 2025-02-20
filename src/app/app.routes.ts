import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '',
        pathMatch : 'full',
        loadComponent : () => {
            return import('./home/home.component').then(m => m.HomeComponent);
        }
    } ,
    {
        path : 'database',
        loadComponent : () => {
            return import('./database/database.component').then(m => m.DatabaseComponent);
        }
    },
    {
        path : 'payroll',
        loadComponent : () => {
            return import('./payroll/payroll.component').then(m => m.PayrollComponent);
        }
    },
    {
        path : 'employeesview',
        loadComponent : () => {
            return import('./employeesview/employeesview.component').then(m => m.EmployeesviewComponent);
        }
    }

];
