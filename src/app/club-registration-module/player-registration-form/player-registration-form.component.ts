import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireDatabase } from '@angular/fire/database';
import { tap } from 'rxjs/operators';

/**
 * Navestock Services
 */
import { PlayerRegistrationService } from '../player-registration.service';
import { MemberObject } from '../player.object';

@Component({
  selector: 'app-player-registration-form',
  templateUrl: './player-registration-form.component.html',
  styleUrls: ['./player-registration-form.component.css']
})
export class PlayerRegistrationFormComponent implements OnInit{
  playerForm = this.fb.group({
    memberDetails: this.fb.group({ // *start* Personal Player Details
      firstName: [null],
      lastName: [null],
      address: this.fb.group({
        address: [null],
        postalCode: [null],
        city: [null],
        county: [null]
    }),
      emailAddress: this.fb.array([this.createEmailAddress()]),
      mobileNumber: this.fb.array([this.createMobileNumber()])
    }),                               // *end* Personal Player Details
    emergencyContact: this.fb.group({ // *start* Emergency Contact Details
      firstName: [null],
      lastName: [null],
      relationship: [null],
      emailAddress: [null],
      mobileNumber: [null]
    }),                             // *end* Emergency Contact Details
                                    // *start* Medical Information
    medicalInformation: this.fb.group({
      doctorName: [null],
      surgeryName: [null],
      doctorContactNumber: [null],
      allergies: [null],
      conditionsMedications: [null],
      consentToShare: [null]
    }),                                // *end* Medical Information
    photohraphyConsent: this.fb.group({ // *start* Photography / Video Consent
      photoVideoConsent: [null]
    }),
    memberStatements: this.fb.group({
      declareDetailsCorrect: [null],
      declareAgreeToClubPrivacyStatement: [null],
      declareAgreeToTakePartInClubActivities: [null],
      signature: [null]
    })
  });



  constructor(
              private fb: FormBuilder,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private prService: PlayerRegistrationService
              ) {
    iconRegistry.addSvgIcon(
      'add_circle_outline',
      sanitizer.bypassSecurityTrustResourceUrl('./app/icons/add_circle_outline-24px.svg'));
  }

  ngOnInit(): void {
    this.prService.getMemberData('lefras.coetzee@gmail.com').subscribe(
      resp => {alert(JSON.stringify(resp));}
    );
  }
  onSubmit() {
    const memberData: MemberObject = this.playerForm.value;
    this.prService.savePlayerData(memberData);
  }

  createEmailAddress(): FormGroup {
    return this.fb.group({
      email: [null]
    });
  }

  createMobileNumber(): FormGroup {
    return this.fb.group({
      mobile: [null]
    });
  }

  addMemberEmail(): void {
    const emailItems = this.playerForm.get('memberDetails.emailAddress') as FormArray;
    emailItems.push(this.createEmailAddress());
  }

}
