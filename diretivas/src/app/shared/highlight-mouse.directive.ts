import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  private _backgroundColor: string;

  @HostBinding('style.backgroundColor')
  get backgroundColor() {
    return this._backgroundColor;
  }

  set backgroundColor(newColor: string) {
    this._backgroundColor = newColor;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.backgroundColor = 'lightgreen';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.backgroundColor = 'white';
  }

  constructor() { }

}
