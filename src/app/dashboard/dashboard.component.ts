import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApisService } from './../services/apis.service';
import { Store, select } from "@ngrx/store";
import * as StudentsActions from "../store/actions/students.actions";
import * as fromStudent from '../store/selectors/students.selectors'
import { apiUrl } from '../../config/config.json';
import axios from 'axios';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  records = []
  editRecord
  students = []
  editStudentId = ''
  constructor(private router: Router, private apisService: ApisService, private store: Store) { }

  ngOnInit(): void {
   this.getStudentRecord()
  }
getStudentRecord(){
  axios.get(apiUrl + '/student', {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
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
  setEditUserId(id, obj) {

    if (id == this.editStudentId) {
      this.editStudentId = ''
      this.editRecord = {}
    }
    else {
      this.editStudentId = id
      this.editRecord = obj
    }
  }
  checkId(id) {
    return id == this.editStudentId;
  }
  update() {
    let id = this.editRecord.studentId
    axios.put(apiUrl + '/student/' + id, this.editRecord, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      this.editStudentId = ''
      this.editRecord = {}
    }).catch(err => {
      console.log(err)
    })


  }
  delete(id) {

    let r = confirm("Are you sure you want to delete Record.");
    if (r == true) {
      axios.delete(apiUrl + '/student/' + id, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        this.getStudentRecord()
      }).catch(err => {
        console.log(err)
      })
    } else {
      console.log("notdeleted")
    }
  }

  changeField(type, value) {
    this.editRecord[type] = value
  }
}
