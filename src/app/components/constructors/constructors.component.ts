import { Component } from '@angular/core';
import { StandingsService } from 'src/app/services/standings.service';

@Component({
  selector: 'app-constructors',
  templateUrl: './constructors.component.html',
  styleUrls: ['./constructors.component.css']
})
export class ConstructorsComponent {
  constructorsStandingsList: any;

  constructor(
    private standingsService: StandingsService
  ) { }

  ngOnInit() {
    // récupération des constructeurs et affectation dans constructorsStandingsList
    this.standingsService.getCurrentSeasonConstructorsStandings()
    this.standingsService.constructorsStandingsListSubject.subscribe((data: any) => {
      this.constructorsStandingsList = data
    })
  }

}
