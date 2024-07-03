import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


interface EmployeeDto {
  number: number;
  classification: string;
}

interface BudgetResponse {
  minBudget: number;
  maxBudget: number;
}
@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:9090/employee';

  private salaryRanges = {
    junior: { min: 2000, max: 5000 },
    senior: { min: 5000, max: 10000 },
    confirme: { min: 4000, max: 8000 },
    aspa: { min: 1500, max: 3000 }
  };

  constructor(private http: HttpClient) { }

  calculateBudget(employees: EmployeeDto[]): BudgetResponse {
    let minBudget = 100000;
    let maxBudget = 200000;

    for (const employee of employees) {
      const range = this.salaryRanges[employee.classification];
      if (range) {
        minBudget -= employee.number * range.min;
        maxBudget -= employee.number * range.max;
      }
    }

    return { minBudget, maxBudget };
  }

  saveEmployeesAndBudget(employeeData: any, idorg: string): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/save/${idorg}`, employeeData);
  }
  updateEmployeesAndBudget(employees: any, idorg: string, minBudget: number, maxBudget: number): Observable<any> {
    const url = `${this.apiUrl}/put/${idorg}`;
    return this.http.put(url, { employees, minBudget, maxBudget });
  }
  getEmployeesByDepartment(id: string): Observable<any> {
    const url = `${this.apiUrl}/department/${id}`;
    return this.http.get<any>(url);
  }

  deleteEnvelope(idorg: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${idorg}`).pipe(
      tap((response: any) => console.log('Response from deleteEnvelope:', response))
    );
  }
  getManagersByStatus(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/demande`);
  }
  
}
export interface EmployeeRec {
  id:number;
  number: any,
  classification:any,
  minbudget:any;
  maxbudget:any;
  
}