import { ApisService } from './../services/apis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-import-popup',
  templateUrl: './import-popup.component.html',
})
export class ImportPopupComponent implements OnInit {
  studentsRecord = []
  previousSchool = ""
  notInserted = ""
  fileName=""
  constructor(private router: Router, private apisService: ApisService) { }

  ngOnInit(): void {
  }
  close() {
    this.router.navigateByUrl('')
  }
  setPreviousSchool(event) {
    console.log(event)
    this.previousSchool = event
  }
  csv2Array(fileInput: FileList) {
    //read file from input
    const fileReaded = fileInput[0];
    this.fileName = fileReaded.name;
    let reader: FileReader = new FileReader();
    reader.readAsText(fileReaded);

    reader.onload = (e) => {
      let csv = reader.result + '';
      let lines = [];
      //our new code
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
  import() {
    this.studentsRecord = this.studentsRecord.map((single) => {
      single.previousSchool = this.previousSchool;
      single.currentSchool = "School X"
      return single;
    })
    this.apisService.importSchoolData(this.studentsRecord).then(res => {
      this.notInserted = res.data.error;
      window.alert("All students inserted successfully"+(this.notInserted?" except "+this.notInserted:""));
      this.router.navigateByUrl('')
    })
  }
}
