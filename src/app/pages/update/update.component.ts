import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


import { BudgetService, EmployeeRec } from 'src/app/budget.service';
import {Employee, EmployeeService } from 'src/app/employee-service';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  updateBudget:any=5000;
  data: Employee[] = [];
  departmentId: string = '123456';
  organizationName: string = '';

  dynamicRows: any[] = [{ number: 0, class: 'junior' }];
  minBudget: number | null = 100000;
  maxBudget: number | null = 200000;
  result:any;

  constructor(private employeeService: EmployeeService,private budgetService:BudgetService,public dialog: MatDialog, private snackBar: MatSnackBar,public router:Router){}
 
  ngOnInit(): void {
    this.getEmployees();
    this.getEmployeesByIdOrg();
  }

  getEmployeesByIdOrg(): void {
    this.budgetService.getEmployeesByDepartment(this.departmentId)
      .subscribe((employees: EmployeeRec[]) => {
       

        this.dynamicRows = employees.map(emp => ({
          number: emp.number,
          class: emp.classification
         
        }));

        console.log(this.dynamicRows);
        // Calculer le budget initial basé sur les valeurs par défaut
        this.calculateBudget();
      });
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
  onKeyPress(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter') {
      // Mettre à jour le budget lorsque la touche "Entrée" est pressée
      this.calculateBudget();
    }
  }
  onInputChange(index: number): void {
    // Mettre à jour le budget lorsque la saisie change
    this.calculateBudget();
  }
  onClassChange(selectedClass: string, index: number): void {
    // Update the class of the dynamicRow object at the specified index
    this.dynamicRows[index].class = selectedClass;
  
    // Call calculateBudget to recalculate the budget based on the updated selection
    this.calculateBudget();
  }
  
 
  addRow(index: number): void {
    this.dynamicRows.splice(index + 1, 0, { number: 0, class: 'junior' });
    this.calculateBudget();
  }

  removeRow(index: number): void {
    if (this.dynamicRows.length > 1) {
      this.dynamicRows.splice(index, 1);
      this.calculateBudget();
    }
  }

  onEmployeeChange(): void {
    this.calculateBudget();
  }
  calculateBudget(): void {
    const employees = this.dynamicRows.map(row => ({
      number: row.number,
      classification: row.class
    }));
  
    this.result = this.budgetService.calculateBudget(employees);
    this.minBudget = this.result.minBudget;
    this.maxBudget = this.result.maxBudget;
  }
  
  confirm(): void {
    const dialogData = new ConfirmDialogModel('Modifier', 'Êtes-vous sûr de vouloir modifier?');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '25vw',
      height: '30vh',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const employees = this.dynamicRows.map(row => ({
          number: row.number,
          classification: row.class
        }));

        const minBudget = this.minBudget;
        const maxBudget = this.maxBudget;
        const idorg = this.departmentId.trim();

        this.budgetService.updateEmployeesAndBudget(employees, idorg, minBudget, maxBudget).subscribe(
          (response) => {
            console.log('Data updated successfully:', response);
            this.router.navigate(['/history']);
          },
          (error) => {
            console.error('Error updating data:', error);
          }
        );
      }
    });
  }

  getImageSrc(blobData: string): string {
    return blobData === '0' ? 'assets/images/others/vide.jpg' : blobData;
  }

  
  cancelEnvelope(): void {
    const dialogData = new ConfirmDialogModel('Confirmation', 'Êtes-vous sûr de vouloir annuler cette enveloppe?');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '25vw',
      height: '30vh',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const idorg = this.departmentId.trim();
        this.budgetService.deleteEnvelope(idorg).subscribe(
          (response: any) => {
            console.log('Envelope deleted successfully');
            this.snackBar.open("Envelope deleted successfully", 'Fermer', { duration: 3000 });
            this.router.navigate(['/history']);
          },
          (error) => {
            console.error('Error deleting envelope:', error);
            const errorMessage = error.error ? error.error : 'Une erreur s\'est produite lors de la suppression de l\'enveloppe.';
            this.snackBar.open(errorMessage, 'Fermer', { duration: 3000 });
          }
        );
      }
    });
  }    
  
}