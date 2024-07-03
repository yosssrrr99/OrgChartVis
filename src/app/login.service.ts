import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:9090/employee';


  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<string> {
    const url = `${this.apiUrl}/login/${username}/${password}`;
    return this.http.post<string>(url, "login avec succes"); // Assuming the response is a string, adjust as per your actual response type
  }
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`,"logout avec succes");
  }

  getUserRole(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/role`)
      
  }
  
}
