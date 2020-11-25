import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { MatchDataService } from '../../matchdata-service/matchdata.service';
import { MapsAPILoader } from '@agm/core';

/** Google map wrapper import */
//import { GoogleMapsAPIWrapper } from '@agm/core';';
declare var google: any;

@Component({
  selector: 'ncc-app-ground',
  templateUrl: './ground.component.html',
  styleUrls: ['../ground.component.scss']
})
export class GroundComponent implements OnInit  {
  @Input() groundLat: string;
  @Input() groundLng: string;
  @Input() homeClub: string;
  @Input() groundName: string;
  @Input() matchId: string;

  private markers: markerObj[] = [];


  /* Google Map Parameters */
  public zoom = 15;
  public draggable = true;
  public fitbounds = true;
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
          iconUrl: '/assets/img/NavestockPin.png',
          infowintxt: [{ address: 'The Green' }, { address: 'Navestockside' }, { address: 'near Brentwood Essex' }, { address: 'CM14 5SD' }]
        }
      )
      // Add Match marker for ground where match  will be palyed
      this.addMarkers( 
        {
          lat: +this.groundLat,
          lng: +this.groundLng,
          draggable: false,
          iconUrl: '/assets/img/cricketmapicon.png',
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
  addMarkers(mapMarker: markerObj): void {
    this.markers.push(mapMarker);
  }

  private mapsGeocodingAddress(grndLat: any, grndLng: any) {
    //Load map geo-coding  
    this.mapsApiLoader.load().then(() => {
      const geocoder = new google.maps.Geocoder();
      const strLatLng = { lat: +grndLat, lng: +grndLng };
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
interface markerObj {
  lat: number;
  lng: number;
  label?: string;
  infowintxt?: addressObj[];
  draggable: boolean;
  iconUrl: string;
}

interface addressObj {
  address: string
}

interface latlongObj {
  lat: number;
  long: number
}