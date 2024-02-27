import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input('appTooltip') tooltipTitle?: string = '';
  @Input() placement?: string;
  delay: number = 300;
  tooltip?: HTMLElement;
  offset = 10;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  show() {
    this.create();
    this.setPosition();
    this.tooltip?.classList.add('ng-tooltip-show');
  }
  hide() {
    window.setTimeout(() => {
      this.tooltip?.classList.remove('ng-tooltip-show');
      this.tooltip?.remove();
      this.tooltip = undefined;
    }, this.delay);
  }

  create() {
    this.tooltip = document.createElement('span');
    this.tooltip.classList.add('ng-tooltip');
    this.tooltip.innerHTML = this.tooltipTitle!;
    // this.tooltip.textContent = this.tooltipTitle!;
    document.body.appendChild(this.tooltip);
  }

  setPosition() {
    const elemRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltip?.getBoundingClientRect();
    if (!tooltipRect) return;
    let left, top;

    switch (this.placement) {
      case 'top':
        top = elemRect.top - tooltipRect.height - this.offset;
        left = elemRect.left + (elemRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = elemRect.bottom + this.offset;
        left = elemRect.left + (elemRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        left = elemRect.left - tooltipRect.width - this.offset;
        break;
      case 'right':
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        left = elemRect.right + this.offset;
        break;
      default:
        throw new Error('Invalid placement value ' + this.placement);
    }

    if (this.tooltip) {
      this.tooltip.style.top = `${top}px`;
      this.tooltip.style.left = `${left}px`;
    } 
  }
}
