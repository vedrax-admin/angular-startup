import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { Role } from './core/models/role.enum';

const appRoutes: Routes = [
    {
        path: 'admin',
        loadChildren: './modules/admin/admin.module#AdminModule',
        //load only module if user is an administrator
        canLoad: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: '',
        loadChildren: './modules/business/business.module#BusinessModule',
        canActivate: [AuthGuard]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);