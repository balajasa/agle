import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { CurrentModalEvent } from 'src/app/models/imodal-service';
import { ModalService } from 'src/app/services/modal.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit, OnDestroy {

  asideVisible: boolean = false;
  modalEventList: CurrentModalEvent[];


  @ViewChild('container', { read: ViewContainerRef, static: false }) container: ViewContainerRef | undefined;
  componentRef: ComponentRef<any> | undefined ;
  subscribeList: Subscription[] = [];
  constructor(
    public mod: ModalService,
    public resolver: ComponentFactoryResolver
  ) {
    this.modalEventList = [];
  }

  ngOnInit() {
    const sb = this.mod.onComponentChange.subscribe((data) => {
      if (data && this.container) {
        const { component, props, currentModalEvent } = data;

        const factory = this.resolver.resolveComponentFactory(component);
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.props = props;
        this.componentRef.instance.currentModalEvent = currentModalEvent;
        this.bindCurrentModalEvent(currentModalEvent);
        return;
      }
    });
    this.subscribeList.push(sb);
  }

  ngOnDestroy(): void {
    this.subscribeList.forEach(sb => sb.unsubscribe());
  }

  close() {
    if(this.container){
      this.container.clear();
      this.mod.close();
    }
  }

  remove(event: CurrentModalEvent) {
    // 為了讓外部邏輯先吃到事件 故延遲關閉
    interval(100).pipe(first()).subscribe(() => {
      const index = this.modalEventList.findIndex(data => data === event);

      if ( index > -1  && this.container) {
        this.container.remove(index);
      }

      event.onSubmit.complete();
      event.onCancel.complete();
      event.onClose.complete();

      this.modalEventList.splice(index, 1);

      if (this.modalEventList.length === 0) {
        this.close();
      }
    });
  }

  handleWrapperClick($event: any, dom: any) {
    if (this.mod.backdrop === true && $event.target === dom) {
      this.mod.close();
    }
  }

  private bindCurrentModalEvent(event: CurrentModalEvent) {

    this.modalEventList.push(event);
    const index = this.modalEventList.length - 1;

    event.onCancel.subscribe(() => {
      this.remove(event);
    });

    event.onClose.subscribe(() => {
      this.remove(event);
    });

    event.onSubmit.subscribe(() => {
      this.remove(event);
    });
  }
}

