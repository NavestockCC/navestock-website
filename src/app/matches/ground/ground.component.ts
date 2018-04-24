import { Component, OnInit, Input } from '@angular/core';

/** Google map wrapper import */
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

@Component({
    selector: 'ground',
    templateUrl: './ground.component.html',
    styleUrls: ['./ground.component.scss']
})
export class GroundComponent implements OnInit {

  @Input() groundLat:string;
  @Input() groundLng:string;
  @Input() homeClub:string;
  @Input() groundName:string;

    constructor(
        public mapsApiLoader: MapsAPILoader
    ) { }

    ngOnInit(): void {

      this.mapsGeocoding(this.groundLat, this.groundLng);

    }




      /* Google Map Parameters */
      zoom : number = 15;
      draggable : boolean = true;
      latlngBounds;
      addressLong: string[] = [];
    
    
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
    
    
  private mapsGeocoding(grndLat: any, grndLng: any) {
    //Load map geo-coding  
    this.mapsApiLoader.load().then(() => {
      let geocoder = new google.maps.Geocoder();
      let strLatLng = {lat: +grndLat, lng: +grndLng};
        geocoder.geocode({ 'location': strLatLng }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              this.addressLong = results[0].address_components
              this.markers.push(
                {
                  lat: +grndLat,
                  lng: +grndLng,
                  draggable: false,
                  iconUrl: '.././app/img/cricketmapicon.png',
                  //  infowintxt: [{ address: this.fixturedetail[0].groundName}, { address: this.fixturedetail[0].groundAddress1}, { address: this.fixturedetail[0].groundAddress2}, {address:this.fixturedetail[0].groundAddressTown}, {address: this.fixturedetail[0].groundPostCode} ]
                }
              )
              this.latlngBounds = new window['google'].maps.LatLngBounds();
              this.markers.forEach((location) => {
                this.latlngBounds.extend(new window['google'].maps.LatLng(location.lat, location.lng))
              })            
            } else {
                this.markers = [];
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
      iconUrl : string;
    }
    
    interface address{
      address: string
    }
    
    interface latlong{
      lat: number;
      long: number
    }