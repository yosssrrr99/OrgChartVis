import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'; 

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LockScreenComponent } from './pages/lock-screen/lock-screen.component';
import { TestComponent } from './pages/test/test.component';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { UnityComponent } from './pages/unity/unity.component';


const routes: Routes = [
  { 
    path: '', 
    
    component: PagesComponent, children: [
        //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
        { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
        { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
        { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
        { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule) },
        { path: 'reservation', loadChildren: () => import('./pages/reservation/reservation.module').then(m => m.ReservationModule) },
        { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
        { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule) },
        { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
        { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
        { path: 'unity', loadChildren: () => import('./pages/unity/unity.module').then(m => m.UnityModule) },
        { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
        { path: 'org', loadChildren: () => import('./pages/operational-unit/operational-unit.module').then(m => m.OperationalUnitModule) },
        { path: 'history', loadChildren: () => import('./pages/historique/historique.module').then(m => m.HistoriqueModule) },
        { path: 'validate', loadChildren: () => import('./pages/validate/validate.module').then(m => m.ValidateModule) },
        { path: 'update', loadChildren: () => import('./pages/update/update.module').then(m => m.UpdateModule) },
        { path: 'terms-conditions', loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) },

    ]
  },
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
  { path: 'lock-screen', component: LockScreenComponent },
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