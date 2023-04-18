import { BigDataComponent } from './../big-data/big-data.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.sass']
})
export class HostingComponent extends BigDataComponent implements OnInit {

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.autoPlaySlide();
  }

}