import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  @Input() exceptList: HTMLElement[] = [];

  wait = true;

  constructor(private el: ElementRef) {
    setTimeout(() => {
      this.wait = false;
    }, 100);
  }
  @Output('appClickOutside') clickOutside = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  public onClick($event: MouseEvent) {
    if (this.wait) {
      return;
    }
    const element: HTMLElement = this.el.nativeElement;
    const minY = element.getBoundingClientRect().top;
    const maxY = minY + element.offsetHeight;
    const minX = element.getBoundingClientRect().left;
    const maxX = minX + element.offsetWidth;
    if (
      $event.clientX < minX ||
      $event.clientX > maxX ||
      $event.clientY < minY ||
      $event.clientY > maxY
    ) {
      if (!this.isExcept($event.target as HTMLElement)) {
        this.clickOutside.emit();
      }
    }

    if ($event.preventDefault) {
      $event.preventDefault();
    }

    if ($event.returnValue) {
      $event.returnValue = false;
    }

    if ($event.cancelBubble) {
      $event.cancelBubble = true;
    }
  }

  isExcept(target: HTMLElement) {
    return this.exceptList.some((item) => item === target);
  }

}
