import { Directive, ElementRef, HostListener, output } from '@angular/core';

/** Emits `clickOutside` when a click occurs outside the host element. */
@Directive({ selector: '[clickOutside]', standalone: true })
export class ClickOutsideDirective {
  clickOutside = output<void>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(target: EventTarget | null): void {
    if (!this.el.nativeElement.contains(target)) {
      this.clickOutside.emit();
    }
  }
}
