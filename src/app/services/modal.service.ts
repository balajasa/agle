import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CurrentModalEvent, IModalService } from '../models/imodal-service';

@Injectable({
  providedIn: 'root'
})
export class ModalService implements IModalService {
  backdrop: boolean | 'static' = true;

  isActive = false;

  onComponentChange: Subject<any> = new Subject<any>();

  constructor() {}

  open(component: any, props?: any): CurrentModalEvent {

    const currentModalEvent: CurrentModalEvent = {
      onClose: new Subject(),
      onCancel: new Subject(),
      onSubmit: new Subject(),
    };

    this.onComponentChange.next({
      component,
      props,
      currentModalEvent
    });

    this.isActive = true;

    return currentModalEvent;
  }

  close() {
    this.onComponentChange.next(null);
    this.backdrop = true;
    this.isActive = false;
  }
}
