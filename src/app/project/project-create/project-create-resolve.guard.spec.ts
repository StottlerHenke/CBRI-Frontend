import { TestBed, async, inject } from '@angular/core/testing';

import { ProjectCreateResolveGuard } from './project-create-resolve.guard';

describe('ProjectCreateResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectCreateResolveGuard]
    });
  });

  it('should ...', inject([ProjectCreateResolveGuard], (guard: ProjectCreateResolveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
