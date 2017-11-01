import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {FixtureDataService} from '../fixture-data.service';
import {fixture} from '../fixture.object';
import {scorecard} from '../scorecard.object';


import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';




declare var google: any;

@Component({
  selector: 'fixture-detail',
  templateUrl: './fixture-detail.component.html',
  styleUrls: ['./fixture-detail.component.css']
})
export class FixtureDetailComponent implements OnInit {
   public fixturedetail: Observable<fixture>;
   public scorecarddetail: Observable<scorecard[]>;
   public fid:string = '';

    constructor(private fixturewidgetdataService: FixtureDataService, public mapsApiLoader: MapsAPILoader, private route: ActivatedRoute){
            
    }

ngOnInit() {
      let pstCde:any = null;
      let sub = this.route.params.subscribe(params => {
            this.fid = params['fid'];
            this.fixturedetail = this.fixturewidgetdataService.getFixtureData(this.fid);
            this.fixturedetail.subscribe(v => {pstCde = v},
                                         e => {console.log(e)},
                                         () => {this.mapsGeocoding(pstCde.groundPostCode)})
      this.scorecarddetail = this.fixturewidgetdataService.getscorecardData(this.fid);  
          });

}



      /* Google Map Parameters */
  lat: number =  51.6538104;
  lng: number =  0.2593911;
  zoom : number = 15;
  draggable : boolean = true;
  latlngBounds;


  /* Google Map Market Parameters */
markers: marker[] = [
	  {
		  lat: 51.6538104,
		  lng: 0.2593911,
		  draggable: false,
      iconUrl: '.././app/img/NavestockPin.png',
      infowintxt: [{ address: 'The Green'}, { address: 'Navestockside'}, {address:'near Brentwood Essex'}, {address: 'CM14 5SD'} ]
	  }
  ]


 private mapsGeocoding(matchAddress: string){
//Load map geo-coding  
    this.mapsApiLoader.load().then(() => {
    let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': matchAddress }, (results, status) => {
       let Opplatitude = results[0].geometry.location.lat();
       let Opplongitude = results[0].geometry.location.lng();
       this.markers.push(
             {
		  lat: Opplatitude,
		  lng: Opplongitude,
		  draggable: false,
      iconUrl: '.././app/img/cricketmapicon.png',
    //  infowintxt: [{ address: this.fixturedetail[0].groundName}, { address: this.fixturedetail[0].groundAddress1}, { address: this.fixturedetail[0].groundAddress2}, {address:this.fixturedetail[0].groundAddressTown}, {address: this.fixturedetail[0].groundPostCode} ]
	  }
       )
     this.latlngBounds = new window['google'].maps.LatLngBounds();
          this.markers.forEach((location) => {
            this.latlngBounds.extend(new window['google'].maps.LatLng(location.lat, location.lng))
          })   
     });
    });
 } 
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
  infowintxt?: address[];
	draggable: boolean;
  iconUrl : string;
}

interface address{
  address: string
}

interface latlong{
  lat: number;
  long: number
}