import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-import-response',
  templateUrl: './import-response.component.html',
})

export class ImportResponseComponent implements OnInit {
  newusers=[]
  @Input() users
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.newusers=this.users
  }
  close(){
    this.router.navigateByUrl('')
  }

}
