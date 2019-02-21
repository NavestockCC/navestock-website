import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

import {CommitteeMember} from '../contact-us-object/committee-member'
import {ContactUsService} from '../contact-us-service/contact-us-service.service'



@Component({
  selector: 'app-contact-us-admin',
  templateUrl: './contact-us-admin.component.html',
  styleUrls: ['./contact-us-admin.component.scss']
})
export class ContactUsAdminComponent{
  committeeForm: FormGroup;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private fb: FormBuilder, private contactUsService:ContactUsService) {
    this.createForm();
    this.contactUsService.getCommitteeMembers().valueChanges().subscribe(
      res =>{ 
        this.createForm();
        res.forEach(element => {
        this.addMember(element);
      });
      
    }
    );
  
    iconRegistry.addSvgIcon(
      'save',
      sanitizer.bypassSecurityTrustResourceUrl('./app/icons/baseline-save-24px.svg'));
      iconRegistry.addSvgIcon(
        'delete',
        sanitizer.bypassSecurityTrustResourceUrl('./app/icons/baseline-delete-24px.svg'));      
  
  }


   createForm() {
    this.committeeForm = this.fb.group({
      'membersArray': this.fb.array([])
    });
   }

  get membersArray(): FormArray {
    return this.committeeForm.get('membersArray') as FormArray;
  }

  initMember(m:CommitteeMember):FormGroup{
      return this.fb.group({
        'Key': new FormControl(m.Key),
        'Title': new FormControl(m.Title, Validators.required),
        'Name': new FormControl(m.Name, Validators.required),
        'Tel': new FormControl(m.Tel),
        'email': new FormControl(m.email),
        'Publish': new FormControl(m.Publish, Validators.required),
        'SortPosition': new FormControl(m.SortPosition, Validators.required),
        'MemberType': new FormControl(m.MemberType, Validators.required)
      });
    }


  addMember(m?:CommitteeMember) {
    if(m){
      this.membersArray.push(this.initMember(m));
    } else {
      let tm:CommitteeMember = new CommitteeMember()
      this.membersArray.push(this.initMember(tm));
    }
  }

  removeMember(indx:number){
    this.contactUsService.deleteCommitteeMembers(this.membersArray.at(indx).value);
    this.membersArray.removeAt(indx);
  }

  saveMember(indx:number){
    this.contactUsService.saveCommitteeMembers(this.membersArray.at(indx).value);
  }
}

