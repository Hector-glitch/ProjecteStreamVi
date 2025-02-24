import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  login(formData: any):Observable<any> {
  const apiUrl = 'https://localhost:3000/login';  // URL de ejemplo
  return this.http.post<any>(apiUrl, formData);  // Llamada POST, enviando datos
  }
}
