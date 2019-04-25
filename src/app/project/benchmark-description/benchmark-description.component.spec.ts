import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkDescriptionComponent } from './benchmark-description.component';

describe('BenchmarkDescriptionComponent', () => {
  let component: BenchmarkDescriptionComponent;
  let fixture: ComponentFixture<BenchmarkDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenchmarkDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
