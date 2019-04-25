import { TestBed, async, inject } from '@angular/core/testing';

import { ProjectUpdateResolveGuard } from './project-update-resolve.guard';

describe('ProjectUpdateResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectUpdateResolveGuard]
    });
  });

  it('should ...', inject([ProjectUpdateResolveGuard], (guard: ProjectUpdateResolveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
