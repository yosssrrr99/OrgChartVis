import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartData, ChartOptions } from 'chart.js';
import { BudgetService, EmployeeRec } from 'src/app/budget.service';
import { Employee, EmployeeService } from 'src/app/employee-service';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SimulationRecService } from 'src/app/simulation-rec.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent {
  gab1: number;
employee:EmployeeRec[]=[]
minBudget:any;
maxBudget:any;
updateBudget:any=5000;
data: Employee[] = [];
departmentId: string = '123456';
organizationName: string = '';
budgetSpent:any;
budgetRemaining:any;
id:number;
filteredEmployees: EmployeeRec[] = [];
searchTerm: string = '';
managers:String[]=[];
selectedManagerId: string = '';


  constructor(private budgetService:BudgetService,private employeeService:EmployeeService,public dialog: MatDialog,private simulationService:SimulationRecService){}

  ngOnInit(): void {
    this.getEmployees();
    this.budgetService.getManagersByStatus().subscribe(data => {
      this.managers = data;
    });
  }


  getEmployeesByIdOrg(): void {
    this.budgetService.getEmployeesByDepartment(this.selectedManagerId)
      .subscribe((employees: EmployeeRec[]) => {
        
     this.employee=employees;
     this.minBudget = Math.min(...employees.map(emp => emp.minbudget));
    this.maxBudget = Math.max(...employees.map(emp => emp.maxbudget));

      console.log(employees);

         });
  }
  onManagerChange(managerId: string): void {
    this.selectedManagerId = managerId;
    this.getEmployeesByIdOrg();
  }
  getEmployees(): void {
    this.employeeService.getEmployeesByDepartment(this.departmentId)
      .subscribe((employees: Employee[]) => {
        this.data = employees;
       
        
        if(this.data[0].nomorg){
          this.organizationName=this.data[0].nomorg;
        }
        
      });
  }
   
  
  updateStatus(): void {
    const dialogData = new ConfirmDialogModel('Confirmation', 'Êtes-vous sûr de refuser la demande?');

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '25vw',
    height: '30vh',
    data: dialogData
  });

  // Attendez la réponse de la boîte de dialogue
  dialogRef.afterClosed().subscribe(result => {
    if (result) { // Vérifiez si l'utilisateur a confirmé
      this.simulationService.setStatus(this.selectedManagerId).subscribe(
        () => {
          console.log('Statut mis à jour avec succès');
          this.getEmployeesByIdOrg(); 
          // Ajoutez ici toute logique supplémentaire après la mise à jour
        },
        error => {
          console.error('Erreur lors de la mise à jour du statut', error);
          // Gérez les erreurs ici
        }
      );
    } else {
      console.log('annuler.');
      // Ajoutez ici toute logique supplémentaire pour annulation
    }
  });
  }

  updateStatusR(): void {
    const dialogData = new ConfirmDialogModel('Confirmation', 'Êtes-vous sûr de refuser la demande?');

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '25vw',
    height: '30vh',
    data: dialogData
  });

  // Attendez la réponse de la boîte de dialogue
  dialogRef.afterClosed().subscribe(result => {
    if (result) { // Vérifiez si l'utilisateur a confirmé
      this.simulationService.setStatusRefuser(this.selectedManagerId).subscribe(
        () => {
          console.log('Statut mis à jour avec succès');
          this.getEmployeesByIdOrg(); 
          // Ajoutez ici toute logique supplémentaire après la mise à jour
        },
        error => {
          console.error('Erreur lors de la mise à jour du statut', error);
          // Gérez les erreurs ici
        }
      );
    } else {
      console.log('annuler.');
      // Ajoutez ici toute logique supplémentaire pour annulation
    }
  });
 

}

}

