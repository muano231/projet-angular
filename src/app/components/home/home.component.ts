import { Component } from '@angular/core';
import { SchedulesService } from 'src/app/services/schedules.service';
import { CircuitImagesUrl } from 'src/assets/mock/img';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nextRaces: any[] = [];
  currentDate = new Date();
  currentYear = new Date().getFullYear();
  circuitImgUrl = CircuitImagesUrl;

  constructor(
    private scheldulesService: SchedulesService
  ) { }

  ngOnInit() {
    // récupération de tous les grand prix de la saison
    this.scheldulesService.getAllScheduleOfCurrentSeason();
    this.scheldulesService.seasonSchedulesListSubject.subscribe((data: any) => {
      data
        // filtre sur les prochains grand prix
        .filter((races: any) => { return new Date(races.Date[0]) >= this.currentDate })
        .forEach((value: any) => { this.nextRaces.push(value) })
        // stockage du round de la course
        sessionStorage.setItem('raceRound',this.nextRaces[0].$.round);
      })    
  }

}
