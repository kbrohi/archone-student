import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApisService } from './../services/apis.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  records = []
  editStudentId = ''
  constructor(private router: Router, private apisService: ApisService) { }

  ngOnInit(): void {
    this.apisService.getSchoolData().then(res => {
      this.records = res.data.data
    })

  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('login')
    // window.location.href='http://localhost:4200/login'
  }
  import() {
    this.router.navigateByUrl('importPopup')
  }
  setEditUserId(id)
  {
    
    if(id==this.editStudentId){
      this.editStudentId =''
    }
    else{
      this.editStudentId =id
    }
  }
  checkId(id){
    return id == this.editStudentId;
  }
}
