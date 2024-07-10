import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from 'src/app/app.service'; 
import { LoginService } from 'src/app/login.service';
import { NotificationService } from 'src/app/notification.service';
import { CartOverviewComponent } from 'src/app/shared/cart-overview/cart-overview.component'; 
import { ReservationDialogComponent } from 'src/app/shared/reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-toolbar1',
  templateUrl: './toolbar1.component.html', 
  styleUrls: ['./toolbar1.component.scss']
})
export class Toolbar1Component implements OnInit {
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>(); 
  constructor(public appService:AppService,private loginService:LoginService,private router:Router,private notificationService:NotificationService) { }
  userRole:String="";
  pendingRequestsCount:number=0;
  notifications:string[]=[];
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

  loadNotifications(): void {
    this.notificationService.getManagersByStatus().subscribe(
      (data: any[]) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications:', error);
      }
    );
  }

  getPendingRequestsCount(): void {
    this.notificationService.getPendingRequestsCount().subscribe(
      (count: number) => {
        this.pendingRequestsCount = count;
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre de demandes en cours:', error);
      }
    );
  }

  navigateToRequests(): void {
    this.router.navigate(['/validate']);
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
        this.userRole = role; // Store the retrieved role in the component's variable
        console.log('Rôle de l\'utilisateur:', this.userRole);
        // You can now use this.userRole in your Angular application
      },
      (error) => {
        console.error('Erreur lors de la récupération du rôle de l\'utilisateur:', error);
      }
    );
  }
  
}