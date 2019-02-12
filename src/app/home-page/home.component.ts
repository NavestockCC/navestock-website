import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit{
  ngAfterViewInit() {
              var script   = document.createElement("script");
							script.type  = "text/javascript";
							script.async;
							script.src   = "//platform.twitter.com/widgets.js";
							script.charset  = "utf-8";
							document.body.appendChild(script);
  }
}
