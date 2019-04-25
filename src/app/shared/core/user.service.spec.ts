import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { ApiGetService } from './apiget.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          UserService,
          { provide: ApiGetService, useValue: { get(endpoint) { return Promise.resolve({}); } } }
      ]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
