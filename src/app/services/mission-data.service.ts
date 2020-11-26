import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpParams} from  '@angular/common/http';
import {Observable} from 'rxjs';
import {filter_data} from '../modelFiles/filter_data';

@Injectable({
  providedIn: 'root'
})
export class MissionDataService {
  missionUrl:string = "https://api.spaceXdata.com/v3/launches?limit=100";
  constructor(private http:HttpClient) { }
  fetchMissionData(filterData:filter_data):Observable<any[]>{
    let params = new HttpParams();
    if(filterData.launch_year>0){params=params.set("launch_year",`${filterData.launch_year}`)};
    if(filterData.launch_success==true){params=params.set("launch_success",`${filterData.launch_success}`)};
    if(filterData.land_success==true){params=params.set("land_success",`${filterData.land_success}`)};
    return <Observable<any[]>>this.http.get(this.missionUrl,{params:params});
  }
}
