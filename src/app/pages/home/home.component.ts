import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChildren('card') cards!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.cards) {
      return;
    }
    this.cards.forEach((card) => {
      this.renderer.listen(card.nativeElement, 'mouseenter', () => {
        this.cards.forEach((c) => {
          this.renderer.removeClass(c.nativeElement, 'flex-[2]');
          const p = c.nativeElement.querySelector('p');
          if (p) {
            this.renderer.removeClass(p, 'rotate-0');
            this.renderer.removeClass(p, 'rotate-90');
            this.renderer.addClass(p, '-rotate-90');
          }
          if (c.nativeElement.getAttribute('data-role') === 'mousepad') {
            if (p) {
              this.renderer.removeClass(p, 'p-0');
              this.renderer.addClass(p, 'ps-14');
            }
          }
          if (c.nativeElement.getAttribute('data-role') === 'tastiere') {
            if (p) {
              this.renderer.removeClass(p, 'p-0');
              this.renderer.addClass(p, 'ps-5');
            }
          }
          if (c.nativeElement.getAttribute('data-role') === 'monitor') {
            if (p) {
              this.renderer.removeClass(p, 'p-0');
              this.renderer.addClass(p, 'ps-5');
            }
          }
          if (c.nativeElement.getAttribute('data-role') === 'microfono') {
            if (p) {
              this.renderer.removeClass(p, 'p-0');
              this.renderer.addClass(p, 'ps-[50px]');
            }
          }
        });
        this.renderer.addClass(card.nativeElement, 'flex-[2]');
        const p = card.nativeElement.querySelector('p');
        if (p) {
          this.renderer.removeClass(p, '-rotate-90');
          this.renderer.addClass(p, 'rotate-0');
          if (card.nativeElement.getAttribute('data-role') === 'mousepad') {
            this.renderer.removeClass(p, 'ps-14');
            this.renderer.addClass(p, 'p-0');
          }
          if (card.nativeElement.getAttribute('data-role') === 'tastiere') {
            this.renderer.removeClass(p, 'ps-5');
            this.renderer.addClass(p, 'p-0');
          }
          if (card.nativeElement.getAttribute('data-role') === 'monitor') {
            this.renderer.removeClass(p, 'ps-5');
            this.renderer.addClass(p, 'p-0');
          }
          if (card.nativeElement.getAttribute('data-role') === 'microfono') {
            this.renderer.removeClass(p, 'ps-[50px]');
            this.renderer.addClass(p, 'p-0');
          }
        }
      });
    });
  }
}
