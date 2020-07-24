import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
})
export class LogInComponent implements OnInit {
  click = "clicking";
  constructor(private authentication: AuthenticationService, private router: Router) {

  }
  ngOnInit(): void {
    if (!!localStorage.getItem('currentUser')) {
      this.router.navigateByUrl('')
    }
  }
  //login fuction
  login(value) {
    this.authentication.login(value.username, value.password)

  }
}
