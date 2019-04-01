import { Component, OnInit, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

import { MatchDataService } from "../matchdata-service/matchdata.service";
import { MapsAPILoader } from '@agm/core';

/** Google map wrapper import */
//import { GoogleMapsAPIWrapper } from '@agm/core';';
import { NgForm } from '@angular/forms';
declare var google: any;

@Component({
  selector: 'app-all-grounds',
  templateUrl: './all-grounds.component.html',
  styleUrls: ['./all-grounds.component.scss']
})
export class AllGroundsComponent implements OnInit {

  private markers: marker[] = [];
  public displayMarkers: marker[] = [];
  public teamsToDisplay: string[] = ['1','2','S']

  /* Google Map Parameters */
  zoom: number = 15;
  draggable: boolean = true;


  constructor(
    private MDS: MatchDataService,
    public mapsApiLoader: MapsAPILoader
  ) { }

  ngOnInit() {
    this.addMarkers(
      {
        lat: 51.6538104,
        lng: 0.2593911,
        draggable: false,
        iconUrl: '.././app/img/NavestockPin.png',
        infowintxt: [{ address: 'The Green' }, { address: 'Navestockside' }, { address: 'near Brentwood Essex' }, { address: 'CM14 5SD' }]
      }
    )
    // Add Match marker for ground where match  will be palyed
    this.MDS.allMatchAddresses(2019).subscribe(
      matchResp => {
        matchResp.forEach(element => {
          this.addMarkers(
            {
              lat: +element.ground_latitude,
              lng: +element.ground_longitude,
              draggable: false,
              infowintxt: [{ address: element.home_club_name + " " + element.home_team_name }, { address: element.away_club_name + " " + element.away_team_name }],
              label: this.markerLabel(element.navestock_team_id)
            }
          )
        });
        this.displayMarkers = this.filterMarkers(this.markers, this.teamsToDisplay);
      }
    )



  }
  /** 
   * Add map market to markers Array and broadcast changes on marketsObservable
   */
  private addMarkers(mapMarker: marker): void {
    this.markers.push(mapMarker);
  }


  private markerLabel(teamId: string): string {
    let labelDescription: string = '';

    //Navestock 1XI
    if (teamId == '204935') {
      labelDescription = '1';
    }

    //Navestock 1XI
    if (teamId == '204936') {
      labelDescription = '2';
    }

    //Navestock 1XI
    if (teamId == '50485') {
      labelDescription = 'S';
    }

    return labelDescription
  }

/**
 * @summary Listens for event from the teamToggle and adds or removes team Markers based on the toggle status
 * @param event - even emited from the toggle
 */
public teamToggle(event: MatSlideToggleChange) {
  // If team is unchecked remove them from the teamsToDisplay array
  if(event.checked === false){
  for( var i = 0; i < this.teamsToDisplay.length; i++){ 
    if ( this.teamsToDisplay[i] === event.source.id) {
      this.teamsToDisplay.splice(i, 1); 
    }
 }
}

// If team is checked push them into the teamsToDisplay array
if (event.checked === true) {
  this.teamsToDisplay.push(event.source.id);
}

// Filter markets based on new teamsToDisplay array
this.displayMarkers = this.filterMarkers(this.markers, this.teamsToDisplay);

}

/**
 * @summary Filters the markets displayed on the Navestock map
 * @param markerArray - An array of the all the markers which the filter will be appliend to
 * @param teamLabel - The adday of teamsLables which will be displayed.
 */
private filterMarkers(markerArray: marker[],teamLabel:string[]):marker[]{
  return markerArray.filter( markerValue => markerValue.label == teamLabel.filter( labelValue => labelValue == markerValue.label )[0])
}

}


// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  infowintxt?: address[];
  draggable: boolean;
  iconUrl?: string;
}

interface address {
  address: string
}

interface latlong {
  lat: number;
  long: number
}