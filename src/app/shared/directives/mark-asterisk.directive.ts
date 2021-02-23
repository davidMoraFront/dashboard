import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[required]'
})
export class MarkAsteriskDirective implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    const parent = this.renderer.parentNode(this.el.nativeElement);
    console.log(parent);
    

    if (parent.getElementsByTagName('label').length && !parent.getElementsByClassName('required').length) {
      parent.getElementsByTagName('label')[0].insertAdjacentHTML('beforeend', '<span class="required">*</span>');
    }
  }

}
