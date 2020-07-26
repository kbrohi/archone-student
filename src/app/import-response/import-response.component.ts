import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-import-response',
  templateUrl: './import-response.component.html',
})

export class ImportResponseComponent implements OnInit {
  newusers = []
  alreadyExist=false
  @Input() users
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.newusers = this.users
    console.log(this.newusers)
    
  }
  //close the popup
  close() {
    this.router.navigateByUrl('')
  }
}
