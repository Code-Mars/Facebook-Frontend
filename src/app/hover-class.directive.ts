import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[hover-class]'
})
export class HoverClassDirective {

  constructor(public elementRef: ElementRef) { }
  @Input('hover-class') hoverClass: any;

  @HostListener('mouseenter') onMouseEnter() {
    if(this.hoverClass=="r"){
      this.elementRef.nativeElement.classList.remove("bi-check-circle");
      this.elementRef.nativeElement.classList.add("bi-check-circle-fill");
    }
    else{
      this.elementRef.nativeElement.classList.remove("bi-x-circle");
      this.elementRef.nativeElement.classList.add("bi-x-circle-fill");
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if(this.hoverClass=="r"){
      this.elementRef.nativeElement.classList.remove("bi-check-circle-fill");
      this.elementRef.nativeElement.classList.add("bi-check-circle");
    }
    else{
      this.elementRef.nativeElement.classList.remove("bi-x-circle-fill");
      this.elementRef.nativeElement.classList.add("bi-x-circle");
    }
  }
}
