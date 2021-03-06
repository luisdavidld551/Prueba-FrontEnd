import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Stores } from '../models/stores';
import { catchError } from 'rxjs/operators';
import { Productos } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  private base = environment.base + 'stores';
  private base2 = environment.base + 'products';

  constructor(private http:HttpClient) { }
 
  getStores(): Observable<Stores[]> {
    return this.http.get<Stores[]>(this.base).pipe(catchError(this.errorHandler))
  }
  getStoresID(idstore:number): Observable<Stores[]> {
    return this.http.get<Stores[]>(this.base + idstore).pipe(catchError(this.errorHandler))
  }
  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.base2 ).pipe(catchError(this.errorHandler))
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
