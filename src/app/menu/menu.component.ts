import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

/** Import Navestock Services */
import {FixtureFirebaseDBServices} from '../services/navestock.firebase.db.service';

/** Navestock Objects */
import {navestockTeam} from '../objects/navestock-teams.objects';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class AppMenu implements OnInit{

  public menuTeams:Observable<navestockTeam[]>;

  constructor(
   private NavDataSrv: FixtureFirebaseDBServices
  )
  {}

  ngOnInit(): void {
    this.menuTeams = this.NavDataSrv.getNavestockTeams(true, false);
  }

}
