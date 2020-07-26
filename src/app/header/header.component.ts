import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  logoutButton = true
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(window.location.pathname==='/login')
    {
      this.logoutButton=false
    }
    else{
      this.logoutButton=true
    }
   
  }
  ngDoCheck(){
    if(window.location.pathname==='/login')
    {
      this.logoutButton=false
    }
    else{
      this.logoutButton=true
    }
  }
  logout() {
    localStorage.clear()
    this.router.navigateByUrl('login')
    // window.location.href='http://localhost:4200/login'
  }
}
