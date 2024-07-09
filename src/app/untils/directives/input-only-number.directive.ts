import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numbersOnly]',
  standalone: true
})
export class NumberDirective {
  regex = /^[0-9]/;
  constructor(private elementRef: ElementRef, private ngControl: NgControl) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: { key: string; keyCode: number; preventDefault: () => void; }) {
    if (!this.regex.test(event.key) && event.keyCode !== 8) {
      event.preventDefault();
    }
  }

}
