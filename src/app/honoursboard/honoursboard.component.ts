import { Component, OnInit } from '@angular/core';
import { HonoursBoardService } from './honours-board.service';
import { Observable } from 'functions/node_modules/rxjs';
import {HonoursBoardPerYear } from './honours-board.object';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-honoursboard',
  templateUrl: './honoursboard.component.html',
  styleUrls: ['./honoursboard.component.scss']
})
export class HonoursboardComponent implements OnInit {

  public hounoursBoard_perYear: Observable<HonoursBoardPerYear[]>;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private honoursBoardService: HonoursBoardService) {
    iconRegistry.addSvgIcon(
      'menu',
      sanitizer.bypassSecurityTrustResourceUrl('./app/icons/cricketball.svg'));
   }

  ngOnInit(): void {
    this.hounoursBoard_perYear = this.honoursBoardService.createHonoursBoard_perYear(this.honoursBoardService.getHonoursBoardData());
  }

}
