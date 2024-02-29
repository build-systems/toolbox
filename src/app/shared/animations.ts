import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInAnimation = trigger('routeAnimations', [
  transition(':enter', [style({ opacity: '0' }), animate(150)]),
]);
