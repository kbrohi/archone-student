import { Injectable } from '@angular/core';
import { apiUrl } from '../../config/config.json';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class ApisService {
  constructor() { }
  importSchoolData(record) {
    return axios.post(apiUrl + '/student', {
      students: record
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  getSchoolData() {
    return axios.get(apiUrl + '/student', {
      headers: {
        "Content-Type": "application/json"
      }
    })

  }
}
