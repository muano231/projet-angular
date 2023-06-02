import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SchedulesService } from 'src/app/services/schedules.service';
import { StandingsService } from 'src/app/services/standings.service';
import { CircuitImagesUrl } from 'src/assets/mock/img';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent {
  raceRound: number;
  nextRaces: any[] = [];
  currentDate = new Date();
  currentYear = new Date().getFullYear();
  circuitImgUrl = CircuitImagesUrl;
  round: number;
  isEdit: boolean = false;
  voteForm: any;
  selectedDriverId: any;
  votes: any = [];
  votesList: any = [];
  nbrOfVotes: number = 0;
  driversStandingsList: any;
  isVoteAllow: boolean = false;

  driversList = [
    { "driverId": "verstappen", "name": "Verstappen", "votes":0 },
    { "driverId": "leclerc", "name": "Lerclerc", "votes":0 },
    { "driverId": "alonso", "name": "Alonso", "votes":0 },
    { "driverId": "ocon", "name": "Ocon", "votes":0 },
    { "driverId": "albon", "name": "Albon", "votes":0 }
  ]

  constructor(
    private scheldulesService: SchedulesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    private standingsService: StandingsService
  ) {
    this.voteForm = this.formBuilder.group({ driver: ['', Validators.required] })
    this.raceRound = Number(sessionStorage.getItem('raceRound'))
    
  }
  
  ngOnInit() {
    // lecture des params de la route
    this.route.params.subscribe(
      async (value) => {
        this.round = value['round'];
        // si le param round est défini, on récupère les votes
        if (this.round) {
          // récupère la liste des pilotes
          this.standingsService.getCurrentSeasonDriversStandings()
          this.standingsService.driversStandingsListSubject.subscribe((data: any) => {
            this.driversStandingsList = data
          })

          // si l'utilisateur a voté, j'affiche les votes, sinon il doit voter
          if(await this.firestoreService.getVote(String(this.round)) || this.round != this.raceRound) {
            // si le round selectionné n'est pas celui du prochain gp, le vote / la modification et la suppression du vote ne sont pas autorisés
            this.isVoteAllow = this.round != this.raceRound ?  true : false;
            this.isEdit = false;
            // récupération des votes
            this.getAllVotes();
          } else {
            this.isEdit = true;
          }
        } else {
          // affiche les anciens grand prix
          this.listOfSchedules();
        }
      }
    )
  }

  // liste des anciens grand prix
  listOfSchedules() {
    this.scheldulesService.getAllScheduleOfCurrentSeason();
    this.scheldulesService.seasonSchedulesListSubject.subscribe((data: any) => {
      data
        .filter((races: any) => { return new Date(races.Date[0]) < this.currentDate })
        .forEach((value: any) => { this.nextRaces.push(value) })
    })
  }

  // choix du pilote pour le vote
  selectDriver(driverId: any) {
    this.selectedDriverId = driverId;
  }

  async onSubmit() {
    if(this.selectedDriverId) {
      // ajoute le vote dans la base firebase
      this.isEdit = await this.firestoreService.setVote(String(this.round),this.selectedDriverId) && false;
      // recharge la liste des votes
      this.getAllVotes()
    }
  }

  async getAllVotes() {
    // récupère la liste des votes par pilote
    this.votes = await this.firestoreService.getAllVotes(String(this.round));
  }

  getVotesForDriver(driverId: string) {
    // retourne le nombre de vote selon le driverId
    const voteValue = this.votes.find((value) => {
      return value.driverId == driverId
    })
    return voteValue?.votes | 0
  }

  // suppression du vote
  async onDelete() {
    this.isEdit = await this.firestoreService.deleteVote() ? true : false
  }

}
