import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const slidePanel = trigger('slidePanel', [
  state('inactive', style({
    height: '0'
  })),
  state('active', style({
    height: '*'
  })),
  transition('inactive => active', animate('180ms ease-in')),
  transition('active => inactive', animate('180ms ease-out'))
]);
