import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Stores } from '../models/stores';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  private base = environment.base + 'stores';

  constructor(private http:HttpClient) { }
 
  getStores(): Observable<Stores[]> {
    return this.http.get<Stores[]>(this.base).pipe(catchError(this.errorHandler))
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
