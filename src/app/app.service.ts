import { Injectable } from '@angular/core';

import { ApiGetService } from './shared/core/apiget.service';

@Injectable()
export class AppService {

  constructor(private apiGetService: ApiGetService) {}

  getVersionInfo() {
    return this.apiGetService.get<string>(`cbri-settings`);
  }
}
