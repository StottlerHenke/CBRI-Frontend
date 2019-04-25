import { NgModule } from '@angular/core';

import { LocalStorageModule } from 'angular-2-local-storage';

import { ApiGetService } from './apiget.service';
import { ConfigService } from './config.service';
import { UserService } from './user.service';
import { WindowRefService } from './window-ref.service';

@NgModule({
  imports: [
      LocalStorageModule.withConfig({
          prefix: 'cbri',
      }),
  ],
  providers: [
      ApiGetService,
      ConfigService,
      UserService,
      WindowRefService,
  ],
  declarations: []  // This is a CoreModule, by convention it's Service-only
})
export class CoreModule { }
