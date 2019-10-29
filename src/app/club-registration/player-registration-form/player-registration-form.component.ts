import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-registration-form',
  templateUrl: './player-registration-form.component.html',
  styleUrls: ['./player-registration-form.component.css']
})
export class PlayerRegistrationFormComponent {
  playerForm = this.fb.group({
    personalDetails: this.fb.group({ // *start* Personal Player Details
      firstName: [null],
      lastName: [null],
      address: [null],
      city: [null],
      county: [null],
      postalCode: [null],
      emailaddress: [null],
      mobile: [null]
    }),                            // *end* Personal Player Details
    emergencyContact: this.fb.group({ // *start* Emergency Contact Details
      firstName: [null],
      lastName: [null],
      relationship: [null],
      mobile: [null],
      landline: [null]
    }),                             // *end* Emergency Contact Details
                                    // *start* Medical Information
    medicalInformation: this.fb.group({
      doctorName: [null],
      surgeryName: [null],
      doctorTel: [null],
      allergies: [null],
      conditionsMedications: [null],
      consentToShare: [null]
    }),                                // *end* Medical Information
    photohraphyConsent: this.fb.group({ // *start* Photography / Video Consent
      photoVideoConsent: [null]
    }),
    playerStatement: this.fb.group({
      certifyAccurate: [null],
      privacyConsent: [null],
      clubActivityConsent: [null]
    })

  });


  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert(JSON.stringify(this.playerForm.value));
  }
}
