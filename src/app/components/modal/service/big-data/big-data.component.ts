import { interval } from 'rxjs';
import { Component, OnDestroy, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.sass']
})
export class BigDataComponent implements OnInit, OnDestroy {
  @Output() contactUs: EventEmitter<any>
  supportSlideSb: any;
  isSlide: boolean;

  constructor() {
    this.contactUs = new EventEmitter<any>();
    this.isSlide = false;
  }

  ngOnDestroy(): void {
    if (this.supportSlideSb) {
      this.supportSlideSb.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.autoPlaySlide();
  }

  autoPlaySlide() {
    this.supportSlideSb = interval(3500).subscribe(() => {
      this.isSlide = !this.isSlide
    });
  }

  contact() {
    this.contactUs.emit();
  }

}
