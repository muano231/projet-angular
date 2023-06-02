import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { API_URL } from 'src/environments/environment';
import { Xml2jsonService } from './xml2json.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  apiUrl: string = API_URL;
  seasonSchedulesListSubject = new Subject;

  constructor(
    private http: HttpClient,
    private xml2json: Xml2jsonService
  ) { }

  // get les courses de la saison actuelle depuis l'api
  getAllScheduleOfCurrentSeason() {
    this.http.get(this.apiUrl+`/f1/current`, { responseType: 'text' }).subscribe(
      (data) => {
        let json = JSON.parse(this.xml2json.parseXML(data));
        this.sendAllScheduleOfCurrentSeason(json["MRData"].RaceTable[0].Race);
      }
    )
  }

  // renvoie le résultat
  sendAllScheduleOfCurrentSeason(data: any) {
    this.seasonSchedulesListSubject.next(data);
  }

}
