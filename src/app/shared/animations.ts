import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInAnimation = trigger('routeAnimations', [
  transition(':enter', [style({ opacity: '0' }), animate(150)]),
]);

export const expandCollapseTitle = [
  trigger('expandCollapse', [
    state(
      'collapsed',
      style({
        height: '0',
        backgroundColor: '#222',
        padding: '0 1rem',
      })
    ),
    state(
      'expanded',
      style({
        height: '*',
      })
    ),
    transition('collapsed => expanded', [animate('300ms ease-out')]),
    transition('expanded => collapsed', [animate('300ms ease-in')]),
  ]),
  trigger('rotateArrow', [
    state(
      'collapsed',
      style({
        transform: 'rotate(0deg)',
      })
    ),
    state(
      'expanded',
      style({
        transform: 'rotate(90deg)',
      })
    ),
    transition('collapsed <=> expanded', [animate('300ms ease-out')]),
  ]),
];
