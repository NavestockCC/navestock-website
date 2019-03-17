import { Component, OnInit, Input } from '@angular/core';
import { MatchDataService } from "../../matchdata-service/matchdata.service";
import { MapsAPILoader } from '@agm/core';

/** Google map wrapper import */
//import { GoogleMapsAPIWrapper } from '@agm/core';';
import { NgForm } from '@angular/forms';
declare var google: any;

@Component({
  selector: 'ground',
  templateUrl: './ground.component.html',
  styleUrls: ['../ground.component.scss']
})
export class GroundComponent implements OnInit {

  @Input() groundLat: string;
  @Input() groundLng: string;
  @Input() homeClub: string;
  @Input() groundName: string;
  @Input() matchId: string;

  private markers: marker[] = [];

  /* Google Map Parameters */
  private zoom: number = 15;
  private draggable: boolean = true;
  public addressLong: string[] = [];

  constructor(
    private MDS: MatchDataService,
    public mapsApiLoader: MapsAPILoader
  ) { }

  ngOnInit(): void {
    if (this.groundLat !== undefined) {
      // Add Navestock market by default
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
      this.addMarkers( 
        {
          lat: +this.groundLat,
          lng: +this.groundLng,
          draggable: false,
          iconUrl: '.././app/img/cricketmapicon.png',
          //  infowintxt: [{ address: this.fixturedetail[0].groundName}, { address: this.fixturedetail[0].groundAddress1}, { address: this.fixturedetail[0].groundAddress2}, {address:this.fixturedetail[0].groundAddressTown}, {address: this.fixturedetail[0].groundPostCode} ]
        }
      )
      
      //Find the nearest addess to the LatLng
      this.mapsGeocodingAddress(this.groundLat, this.groundLng)
    }
  }

  /** 
   * Add map market to markers Array and broadcast changes on marketsObservable
   */
  addMarkers(mapMarker: marker): void {
    this.markers.push(mapMarker);
  }

  private mapsGeocodingAddress(grndLat: any, grndLng: any) {
    //Load map geo-coding  
    this.mapsApiLoader.load().then(() => {
      let geocoder = new google.maps.Geocoder();
      let strLatLng = { lat: +grndLat, lng: +grndLng };
      geocoder.geocode({ 'location': strLatLng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.addressLong = results[0].address_components
          }
        }
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
  iconUrl: string;
}

interface address {
  address: string
}

interface latlong {
  lat: number;
  long: number
}