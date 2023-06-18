import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[maxTwoDigits]'
})
export class MaxTwoDigitsDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInput() {
    const value = this.el.nativeElement.value;
    if (value && value.length > 2) {
      this.el.nativeElement.value = value.slice(0, 2);
    }
  }
}
