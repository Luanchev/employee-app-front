import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightHover]',
  standalone: true
})
export class HighlightHoverDirective {

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('2px solid blue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(border: string) {
    this.el.nativeElement.style.border = border;
    this.el.nativeElement.style.transition = 'border 0.3s'; 
  }

}