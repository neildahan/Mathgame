import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Credentials } from '../models/credentials.interface';
import { BehaviorSubject, catchError, map, Observable, switchMap } from 'rxjs';
import { User } from '../models/user.interface';
import { BaseResponse } from '../models/base-response.interface';
import { environment } from 'src/environments/environment';
import { LoginErrorComponent } from '../shared/login-error/login-error.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userChange = new BehaviorSubject<User | null>(null);
  user$ = this.userChange.asObservable();


  error : string = ""


  constructor(private http: HttpClient, private dialog: MatDialog) { }

  doLogin(credentials: Credentials): Observable<User> {
    return this.http.post<BaseResponse<{ token: string }>>(environment.baseUrl + "users/login", credentials).pipe(
      switchMap((res: BaseResponse<{ token: string }>) => {
        sessionStorage.setItem("token", res.data.token);
        return this.getUserDetails()
      }), catchError((err: any) => {
        this.errorDialog()
        this.error = err.error.msg
        console.log(err.error.msg)
        throw err
      })
    )
  }


  getUserDetails(): Observable<User> {
    return this.http.get<BaseResponse<User>>(environment.baseUrl + "users/user").pipe(
      map((res) => {
        this.userChange.next(res.data)
        return res.data
      })
    )
  }

  errorDialog() {
    this.dialog.open(LoginErrorComponent)
  }

}
