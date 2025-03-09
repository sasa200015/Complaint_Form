import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/project/storeUser.php';
  private loginapi='http://localhost/project/log_in.php';
  private getapi='http://localhost/project/getUser.php';
  constructor(private http: HttpClient) {}

  registerUser(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData); 
  }
  login(userdata: any): Observable<any> {
    const formData = new FormData();
    formData.append("UserName", userdata.UserName);
    formData.append("Password", userdata.Password);
    return this.http.post<any>(this.loginapi, formData);
  }
  getusers(): Observable<User[]> {
    return this.http.get<User[]>(this.getapi);
  }
  
}
