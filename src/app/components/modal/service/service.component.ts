import { Component, Input, OnInit } from '@angular/core';
import { getOffsetInWindow, moveFromElement } from 'src/app/helper/tool';
import { CurrentModalEvent } from 'src/app/models/imodal-service';
import { IServiceConfig } from 'src/app/pages/home/home.component';

interface IProps {
  index: number;
  serviceConfigs: IServiceConfig[]
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.sass']
})
export class ServiceComponent implements OnInit {
  @Input() props: IProps;
  @Input() currentModalEvent: CurrentModalEvent | undefined;
  currentConfig: IServiceConfig;

  constructor() {
    this.currentConfig = {
      title: '',
      caption: '',
      link: ''
    };
    this.props = {
      index: 0,
      serviceConfigs: [{
        title: '',
        caption: '',
        link: ''
      }]
    };
  }

  ngOnInit(): void {
  }

  close() {
    if(this.currentModalEvent){
      this.currentModalEvent.onClose.next(true)
    }
  }

  submit() {
    if(this.currentModalEvent){
      this.currentModalEvent.onSubmit.next(true)
    }
  }

  prev() {
    this.props.index = this.props.index === 0 ? this.props.serviceConfigs.length - 1 : this.props.index - 1;
    this.updateCurrentConfig();
    this.scrollTop();
  }

  next() {
    this.props.index = this.props.index === this.props.serviceConfigs.length - 1 ? 0 : this.props.index + 1;
    this.updateCurrentConfig();
    this.scrollTop();
  }

  updateCurrentConfig() {
    this.currentConfig = this.props.serviceConfigs[this.props.index];
  }

  scrollTop() {
    const el: HTMLElement = document.querySelector('.popup-inner') as HTMLElement
    console.log(el)
    if(el) {
      moveFromElement(true, el, 0);

    }
  }

}
