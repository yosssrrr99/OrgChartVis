
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd } from '@angular/router';
import { BudgetService } from 'src/app/budget.service';
import { Employee, EmployeeAndTotalSalaryResponse, EmployeeService } from 'src/app/employee-service';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-unity',
  templateUrl: './unity.component.html',
  styleUrls: ['./unity.component.scss']
})
export class UnityComponent {
  updateBudget:any=5000;
  data: Employee[] = [];
  departmentId: string = 'P00000653';
  organizationName: string = '';
  gab1: number;
  gab2: number;
  oldBuget1: number;
  oldBuget2: number;
  budgetAnnuel1: number;
  budgetAnnuel2: number; 
  dynamicRows: any[] = [{ number: 0, class: 'junior' }];
  minBudget: number | null = 100000;
  maxBudget: number | null = 200000;
  result:any;
  tab1Data: Employee[] = []; 
  emptySelection: boolean = false;
  private _budgetGlobal1: number = 0;
  isBlinking: boolean = false;
  isClicked: boolean = false;

  constructor(private employeeService: EmployeeService,private budgetService:BudgetService,public dialog: MatDialog,public snackBar: MatSnackBar,private router:Router){}
 
  ngOnInit(): void {
    this.startBlinking();
    this.getEmployeesByOrganisation();
  }

  get budgetGlobal1(): number {
    return this._budgetGlobal1;
  }

  set budgetGlobal1(value: number) {
    this._budgetGlobal1 = value;
    this.updateGab1();
  }

  updateGab1() {
    this.gab1 = this.budgetGlobal1 - this.budgetAnnuel1;
  }
  getEmployeesByOrganisation(): void {
    this.employeeService.getEmployeesByDepartment(this.departmentId).subscribe((response: EmployeeAndTotalSalaryResponse) => {
      this.data = response.employees.filter(employee => employee.idorg === this.departmentId);
     

            this.budgetAnnuel1 = response.totalSalary;
          
          //  this.gab1=this.budgetGlobal1-this.budgetAnnuel1;
            
        
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
  startBlinking() {
    setInterval(() => {
      if (this.gab1 < 0 && !this.isClicked) {
        this.isBlinking = !this.isBlinking;
      } else {
        this.isBlinking = false;
      }
    }, 500); // Intervalle de 500ms pour le clignotement
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
    this.gab1 = this._budgetGlobal1-this.result.maxBudget;
  }
  
  
  
  confirm(): void {
    // Vérifier s'il y a des sélections vides
    const isEmptySelected = this.dynamicRows.some(row => row.number === 0);
    
    if (isEmptySelected) {
      // Afficher une alerte ou une notification
      this.snackBar.open('Veuillez remplir toutes les sélections de classification.', '×', { panelClass: 'warning', duration: 5000 });
      return;
    }
  
    // Si aucune sélection vide, ouvrir la boîte de dialogue de confirmation
    const dialogData = new ConfirmDialogModel('Confirmation', 'Êtes-vous sûr de vouloir confirmer?');
  
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
        
        const idorg = "P00000653";
  
        this.budgetService.saveEmployeesAndBudget(employees, idorg).subscribe(
          (response) => {
            console.log('Data saved successfully:', response);
            this.snackBar.open('Envelope ajouté avec succés!', '×', { panelClass: 'success',  duration: 5000 });
  
            this.router.navigate(['/history']);
          },
          (error) => {
            console.error('Error saving data:', error);
          }
        );
      }
    });
  }
  
  handleClick() {
    this.isClicked = true;
  }
  getImageSrc(blobData: string): string {
    return blobData === '0' ? 'assets/images/others/vide.jpg' : blobData;
  }

  
  






 
}