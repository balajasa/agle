import { Observable, Subject } from 'rxjs';

export interface CurrentModalEvent {
  onClose: Subject<any>;
  onCancel: Subject<any>;
  onSubmit: Subject<any>;
}

export interface IModalService {
  backdrop: boolean | 'static';
  isActive: boolean;

  onComponentChange: Observable<any>;

  open(component: any, props?: any): CurrentModalEvent;
  close(): void;
}
