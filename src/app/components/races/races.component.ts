import { Component } from '@angular/core';
import { SchedulesService } from 'src/app/services/schedules.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent {
  schedulesList: any;

  constructor(
    private schedulesService: SchedulesService
  ) { }

  ngOnInit() {
    // affiche la liste des courses de la saison en cours
    this.schedulesService.getAllScheduleOfCurrentSeason()
    this.schedulesService.seasonSchedulesListSubject.subscribe((data: any) => {
      this.schedulesList = data
    })
  }

}
