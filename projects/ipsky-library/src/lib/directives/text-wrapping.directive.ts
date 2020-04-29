import { Directive, Input, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[textWrapping]'
})
export class TextWrappingDirective implements AfterViewInit {

  isViewInit: boolean;
  _text: string;
  @Input()
  set textWrapping(value: string) {
    this._text = value;
    if (this.isViewInit) {
      this.setEleInnerHTML();
    }
  }
  get textWrapping() {
    return this._text;
  }

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.isViewInit = true;
    this.setEleInnerHTML();
  }

  setEleInnerHTML() {
    this.elementRef.nativeElement.innerHTML = this.textWrapping && this.textWrapping.replace(/\n/g, '<br>');
  }
}
