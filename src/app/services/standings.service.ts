import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { API_URL } from 'src/environments/environment';
import { Xml2jsonService } from './xml2json.service';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  apiUrl: string = API_URL;
  driversStandingsListSubject = new Subject;
  constructorsStandingsListSubject = new Subject;

  constructor(
    private http: HttpClient,
    private xml2json: Xml2jsonService
  ) { }

  // get la liste des pilotes de la saison depuis l'api
  getCurrentSeasonDriversStandings() {
    this.http.get(this.apiUrl+"/f1/current/driverStandings", { responseType: 'text' }).subscribe(
      (data) => {
        let json = JSON.parse(this.xml2json.parseXML(data));
        this.sendCurrentSeasonDriversStandings(json["MRData"].StandingsTable[0].StandingsList[0].DriverStanding);
      }
    )
  }

  // renvoie la liste des pilotes
  sendCurrentSeasonDriversStandings(data: string) {
    this.driversStandingsListSubject.next(data);
  }
  
  // get la liste des constructeurs de la saison depuis l'api
  getCurrentSeasonConstructorsStandings() {
    this.http.get(this.apiUrl+"/f1/current/constructorStandings", { responseType: 'text' }).subscribe(
      (data) => {
        let json = JSON.parse(this.xml2json.parseXML(data));
        this.sendCurrentSeasonConstructorsStandings(json["MRData"].StandingsTable[0].StandingsList[0].ConstructorStanding);
      }
    )
  }

  // renvoie la liste des constructeurs
  sendCurrentSeasonConstructorsStandings(data: string) {
    this.constructorsStandingsListSubject.next(data);
  }

}
