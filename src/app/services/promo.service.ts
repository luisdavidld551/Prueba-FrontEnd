import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Promos } from '../models/promos';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  private base = environment.base + 'promos';

  constructor(private http:HttpClient) { }
 
  getPromos(): Observable<Promos[]> {
    return this.http.get<Promos[]>(this.base).pipe(catchError(this.errorHandler))
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
