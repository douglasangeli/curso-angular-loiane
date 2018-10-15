import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements OnInit {
  
  @Input()
  defaultColor = 'white';

  @Input('highlight')
  highlightColor = 'lightyellow';

  @HostBinding('style.backgroundColor')
  private _backgroundColor: string;

  @HostListener('mouseenter')
  onMouseEnter() {
    this._backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this._backgroundColor = this.defaultColor;
  }

  constructor() { }

  ngOnInit(): void {
    this._backgroundColor = this.defaultColor;
  }
}
