import { BigDataComponent } from './../big-data/big-data.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.sass']
})
export class ResponsiveComponent extends BigDataComponent implements OnInit {

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.autoPlaySlide();
  }

}
