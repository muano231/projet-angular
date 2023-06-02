import { Component } from '@angular/core';
import { StandingsService } from 'src/app/services/standings.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent {
  driversStandingsList: any;

  constructor(
    private standingsService: StandingsService
  ) { }

  // récupération des pilotes et affectation dans driversStandingsList
  ngOnInit() {
    this.standingsService.getCurrentSeasonDriversStandings()
    this.standingsService.driversStandingsListSubject.subscribe((data: any) => {
      this.driversStandingsList = data
    })
  }

}
