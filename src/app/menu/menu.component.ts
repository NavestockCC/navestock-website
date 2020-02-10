import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {Observable} from 'rxjs';

/** Import Navestock Services */
import {FixtureFirebaseDBServices} from '../services/navestock.firebase.db.service';

/** Navestock Objects */
import {navestockTeam} from '../objects/navestock-teams.objects';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class AppMenu implements OnInit{
  @Input() menuStyle: string;

  public menuTeams:Observable<navestockTeam[]>;
  public showHorizontalMenu:boolean = false;
  public showPopupMenu:boolean = false;

constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private NavDataSrv: FixtureFirebaseDBServices) {
    iconRegistry.addSvgIcon(
        'menu',
        sanitizer.bypassSecurityTrustResourceUrl('./app/icons/round-menu-24px.svg'));
    }

  ngOnInit(): void {
    this.menuTeams = this.NavDataSrv.getNavestockTeams(true, false);
    
    /*  Select the type of menu to display */
    switch(this.menuStyle){
      case 'popup':{
        this.showPopupMenu = true;
        break;
      }
      case 'horizontal':{
        this.showHorizontalMenu = true;
        break;
      }
      case 'dynamic':{
        this.showPopupMenu = true;
        this.showHorizontalMenu = true;
        break;
      }
      default:{
        this.showPopupMenu = true;
        this.showHorizontalMenu = true;
        break;
      }       
    }
  }

}
