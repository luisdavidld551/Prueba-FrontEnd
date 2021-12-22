import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Users } from '../models/users';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private base = environment.base + 'user';

  constructor(private http:HttpClient) { }
 
  getUser(): Observable<Users[]> {
    return this.http.get<Users[]>(this.base).pipe(catchError(this.errorHandler))
  }

  handleDataUser(token: any) {
    localStorage.setItem('home', token);
  }

  getUserHome() {
    return localStorage.getItem('home');
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  
}
