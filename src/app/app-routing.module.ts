import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'; 

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LockScreenComponent } from './pages/lock-screen/lock-screen.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { 
    path: '', 
    
    component: PagesComponent, children: [
        //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
        { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),canActivate:[AuthGuard],data: { expectedRoles: ['YMGRALL','ALLHRLO'] } },
      //  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),canActivate:[AuthGuard],data: { expectedRoles: ['YMGRALL','ALLHRLO'] }  },
     //   { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) ,canActivate:[AuthGuard],data: { expectedRoles: ['YMGRALL','ALLHRLO'] } },
     //   { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule),canActivate:[AuthGuard] ,data: { expectedRoles: ['YMGRALL','ALLHRLO'] } },
     //   { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) ,canActivate:[AuthGuard],data: { expectedRoles: ['YMGRALL','ALLHRLO'] } },
        { path: 'unity', loadChildren: () => import('./pages/unity/unity.module').then(m => m.UnityModule),canActivate:[AuthGuard] ,data: { expectedRoles: ['YMGRALL'] } },
    //    { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) ,canActivate:[AuthGuard],data: { expectedRoles: ['YMGRALL','ALLHRLO'] } },
        { path: 'org', loadChildren: () => import('./pages/operational-unit/operational-unit.module').then(m => m.OperationalUnitModule),  canActivate: [AuthGuard],data: { expectedRoles: ['YMGRALL','ALLHRLO'] } },
        { path: 'history', loadChildren: () => import('./pages/historique/historique.module').then(m => m.HistoriqueModule),canActivate:[AuthGuard],data: { expectedRoles: ['YMGRALL'] }  },
        { path: 'validate', loadChildren: () => import('./pages/validate/validate.module').then(m => m.ValidateModule),canActivate:[AuthGuard] ,data: { expectedRoles: ['ALLHRLO'] } },
        { path: 'update', loadChildren: () => import('./pages/update/update.module').then(m => m.UpdateModule),canActivate:[AuthGuard],data: { expectedRoles: ['YMGRALL'] }  },
        { path: 'affectation', loadChildren: () => import('./pages/simulation/simulation.module').then(m => m.SimulationAffectationModule),canActivate:[AuthGuard] ,  data: { expectedRoles: ['ALLHRLO'] }},
    

    ]
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
  { path: 'lock-screen', component: LockScreenComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabledBlocking'
})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }