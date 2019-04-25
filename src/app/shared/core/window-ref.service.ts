import { Injectable } from '@angular/core';

function getWindow() {
    return window;
}

@Injectable()
export class WindowRefService {

  constructor() { }

  get nativeWindow(): any {
      return getWindow();
  }
}
