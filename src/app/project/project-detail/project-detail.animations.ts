import { trigger, state, style, transition, animate } from '@angular/animations';

export const slidePanel = trigger('slidePanel', [
  state('inactive', style({
    height: '0'
  })),
  state('active', style({
    height: '*'
  })),
]);
