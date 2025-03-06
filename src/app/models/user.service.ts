import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/project/storeUser.php';
  private loginapi='';
  private getapi='';
  constructor(private http: HttpClient) {}

  registerUser(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData); 
  }
  login(userdata:FormData):Observable<any>{
    return this.http.post<any>(this.loginapi,userdata);
  }
  getusers():Observable<User[]>{
    return this.http.get<User[]>(this.getapi);
  }
  
}
