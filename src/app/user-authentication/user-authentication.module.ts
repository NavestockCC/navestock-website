import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Navestock authentication modules
 */
  import {NavestockUserAuthenticationMaterialModule} from "./user-authentication.material.module";
  import {UserAuthenticationComponent} from "./user-authentication/user-authentication.component";

@NgModule({
  declarations: [
    UserAuthenticationComponent
  ],
  exports:[
    UserAuthenticationComponent
  ],
  imports: [
    CommonModule,
    NavestockUserAuthenticationMaterialModule
  ]
})
export class UserAuthenticationModule { }
