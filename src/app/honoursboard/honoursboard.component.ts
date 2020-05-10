import { Component, OnInit } from '@angular/core';
import { HonoursBoardService } from './honours-board.service';
import { Observable } from 'functions/node_modules/rxjs';
import {HonoursBoardPerYear } from './honours-board.object';

@Component({
  selector: 'app-honoursboard',
  templateUrl: './honoursboard.component.html',
  styleUrls: ['./honoursboard.component.scss']
})
export class HonoursboardComponent implements OnInit {

  public hounoursBoard_perYear: Observable<HonoursBoardPerYear[]>;

  constructor( private honoursBoardService: HonoursBoardService) {
   }

  ngOnInit(): void {
    this.hounoursBoard_perYear = this.honoursBoardService.createHonoursBoard_perYear(this.honoursBoardService.getHonoursBoardData());
  }

}
