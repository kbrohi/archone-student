import { ApisService } from './../services/apis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import axios from "axios"
import { apiUrl } from '../../config/config.json';
@Component({
  selector: 'app-import-popup',
  templateUrl: './import-popup.component.html',
})
export class ImportPopupComponent implements OnInit {
  studentsRecord = []
  previousSchool = ""
  notInserted
  fileName = ""
  popup = "no"
  constructor(private router: Router, private apisService: ApisService) { }

  ngOnInit(): void {
  }
  //close the popup
  close() {
    this.router.navigateByUrl('')
  }
  //get the value of previous school to push in other fields
  setPreviousSchool(event) {
    this.previousSchool = event
  }
  //convert csv to jsom
  csv2Array(fileInput: FileList) {
    //read file from input
    const fileReaded = fileInput[0];
    this.fileName = fileReaded.name;
    let reader: FileReader = new FileReader();
    reader.readAsText(fileReaded);

    reader.onload = (e) => {
      let csv = reader.result + '';
      let lines = [];
      let arr = csv.split('\n');
      let jsonObj = [];
      let headers = arr[0].split(',');
      for (var i = 1; i < arr.length; i++) {
        let data = arr[i].split(',');
        let obj = {};
        for (var j = 0; j < data.length; j++) {
          obj[headers[j].trim()] = data[j].trim();
        }
        if (obj && obj["name"]) {
          jsonObj.push(obj);
        }
      }
      this.studentsRecord = [...jsonObj]
      // all rows in the csv file
    }
  }
  //push the previous school to record and call the endpoint for update
  import() {
    if (this.previousSchool === "") {
      let r = confirm("Are you sure you want to continue without School");
      if (r == true) {
        axios.post(apiUrl + '/student', {
          students: this.studentsRecord
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res=>{
          this.notInserted = res.data.error;
          this.notInserted = this.notInserted.split(',')
          this.popup = 'yes'
        })
      }
    }
    else {
      this.studentsRecord = this.studentsRecord.map((single) => {
      single.previousSchool = this.previousSchool;
      single.currentSchool = "School X"
      return single;
    })
    axios.post(apiUrl + '/student', {
      students: this.studentsRecord
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res=>{
      this.notInserted = res.data.error;
      this.notInserted = this.notInserted.split(',')
      this.popup = 'yes'
    })
    }
   
  }
}
