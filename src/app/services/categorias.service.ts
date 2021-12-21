import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Categorias } from '../models/categorias';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private base = environment.base + 'categories';

  constructor(private http:HttpClient) { }
 
  getCategorias(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(this.base).pipe(catchError(this.errorHandler))
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
