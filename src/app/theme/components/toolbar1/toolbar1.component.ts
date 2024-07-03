import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from 'src/app/app.service'; 
import { LoginService } from 'src/app/login.service';
import { CartOverviewComponent } from 'src/app/shared/cart-overview/cart-overview.component'; 
import { ReservationDialogComponent } from 'src/app/shared/reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-toolbar1',
  templateUrl: './toolbar1.component.html' 
})
export class Toolbar1Component implements OnInit {
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>(); 
  constructor(public appService:AppService,private loginService:LoginService,private router:Router) { }
  userRole:String="";
  ngOnInit() { 
    this.fetchUserRole();
  }

  public sidenavToggle(){
    this.onMenuIconClick.emit();
  }
  public openCart(){ 
    this.appService.openCart(CartOverviewComponent)
  }
  public reservation(){ 
    this.appService.makeReservation(ReservationDialogComponent, null, true);   
  }

  logout(): void {
    this.loginService.logout().subscribe(
      response => {
        console.log('Logout successful:', response);
        // Gérer la redirection vers la page de connexion ou une autre page après la déconnexion
        this.router.navigate(['/login']); // Redirection vers la page de login après la déconnexion
      },
      error => {
        console.error('Logout error:', error);
        // Gérer les erreurs de déconnexion ici
      }
    );
  }

  
  fetchUserRole(): void {
    this.loginService.getUserRole().subscribe(
      (role: string) => {
        this.userRole = role; // Stocker le rôle récupéré dans la variable du composant
        console.log('Rôle de l\'utilisateur:', this.userRole);
        // Vous pouvez maintenant utiliser this.userRole dans votre application Angular
      },
      (error) => {
        console.error('Erreur lors de la récupération du rôle de l\'utilisateur:', error);
      }
    );
  }
}