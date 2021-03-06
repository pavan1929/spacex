import { Component } from '@angular/core';
import {MissionDataService} from './services/mission-data.service';
import {mission_data} from './modelFiles/mission_data';
import {filter_data} from './modelFiles/filter_data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spacex';
  missionData:mission_data[];
  eachMission:mission_data;
  filterData:filter_data;
  filterYears:number[];
  selectedYear:number;
  selectedLaunch:number;
  selectedLand:number;
  loadingIcon:boolean = true;
  constructor(private missionDataService:MissionDataService){}
  ngOnInit(){
    this.filterData = {};
    this.filterYears = Array(15).fill(2006).map((x,i)=>x+i);
    this.eachMission = {"flight_number":0,"launch_success":false,"launch_year":"","mission_id":[""],"mission_name":"","launch_landing":false,"mission_patch_small":""}; //default values
    this.fetchData();
  }
  fetchData(){
    this.loadingIcon = true;
    this.missionData = [];
    this.missionDataService.fetchMissionData(this.filterData).subscribe(missionsArray=>{
      missionsArray.forEach(missionValue=>{
        this.eachMission = {"flight_number":0,"launch_success":false,"launch_year":"","mission_id":[""],"mission_name":"","launch_landing":false,"mission_patch_small":""};
        this.eachMission.flight_number = missionValue.flight_number;
        this.eachMission.launch_success = missionValue.launch_success;
        this.eachMission.launch_landing = missionValue.launch_landing ? missionValue.launch_landing:false;
        this.eachMission.launch_year = missionValue.launch_year;
        this.eachMission.mission_id = missionValue.mission_id;
        this.eachMission.mission_name = missionValue.mission_name;
        this.eachMission.mission_patch_small = missionValue.links.mission_patch_small;
        this.missionData.push(this.eachMission);
      });
      if(this.missionData.length>0){
        this.loadingIcon = false;
      }
    },err=>{alert(err.status+" Error Occured")},
    ()=>{if(this.missionData.length==0){
      alert("No records found, please select another filter");
      this.loadingIcon = false;
    }
    });
  };
  changeYear(value,index){
    this.filterData.launch_year = value;
    this.fetchData();
    this.selectedYear = index;
  };
  changeLaunch(value,index){
    this.filterData.launch_success = (value.toLowerCase()=="true"?true:false);
    this.fetchData();
    this.selectedLaunch = index;
  };
  changeLand(value,index){
    this.filterData.land_success = (value.toLowerCase()=="true"?true:false);
    this.fetchData();
    this.selectedLand = index
  };
  filterReset(){
    this.filterData = {};
    this.selectedYear=null;
    this.selectedLaunch=null;
    this.selectedLand=null;
    this.fetchData();
  };
}
