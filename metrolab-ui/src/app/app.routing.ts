import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { Role } from './core/models/role.enum';

const appRoutes: Routes = [
    {
        path: 'admin',
        loadChildren: '../modules/admin/admin.module#AdminModule',
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: '',
        loadChildren: '../modules/business/business.module#BusinessModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);