import { BigDataComponent } from './../big-data/big-data.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customized',
  templateUrl: './customized.component.html',
  styleUrls: ['./customized.component.sass']
})
export class CustomizedComponent extends BigDataComponent implements OnInit {

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.autoPlaySlide();
  }

}
