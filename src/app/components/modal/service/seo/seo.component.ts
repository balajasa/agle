import { BigDataComponent } from './../big-data/big-data.component';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.sass']
})
export class SeoComponent extends BigDataComponent implements OnInit {

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.autoPlaySlide();
  }

}