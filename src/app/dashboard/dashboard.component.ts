import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApisService } from './../services/apis.service';
import { Store, select } from "@ngrx/store";
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
  noRecordFound=false
  CancelToken = axios.CancelToken;
  cancel
  constructor(private router: Router, private apisService: ApisService, private store: Store) {

  }

  ngOnInit(): void {
    this.getStudentRecord()
  }
  //get initial record
  getStudentRecord() {
    axios.get(apiUrl + '/student', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      
        this.records = res.data.data 
      if(this.records.length<1){
        this.noRecordFound=true
      }
     
      
    })
  }
  //navigate to import page
  import() {
    this.router.navigateByUrl('importPopup')
  }
  //get the updated values
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
  //retrun the id of student for edit
  checkId(id) {
    return id == this.editStudentId;
  }
  //change the field of student for updated
  changeField(type, value) {
    this.editRecord[type] = value
  }
  //call the update end point
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
  //delete user
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
    }
  }
  //search records
  search(event) {
    this.cancel && this.cancel()
    axios.get(apiUrl + '/student/' + event,
      {
        cancelToken: new this.CancelToken((c) => {
          // An executor function receives a cancel function as a parameter
          this.cancel = c;
        })
      }
    ).then(res => {
      this.records = res.data.data
    })
  }
}
