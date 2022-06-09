import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }

  user$ = this.authService.user$

  ngOnInit(): void {
  }


  doLogin(userName: string, password: string) {
    this.authService.doLogin({ userName, password }).subscribe( () =>
    this.router.navigateByUrl('/home')
    )

  }

}
