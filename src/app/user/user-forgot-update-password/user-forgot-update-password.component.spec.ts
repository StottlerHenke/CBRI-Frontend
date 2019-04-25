import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForgotUpdatePasswordComponent } from './user-forgot-update-password.component';

describe('UserForgotUpdatePasswordComponent', () => {
  let component: UserForgotUpdatePasswordComponent;
  let fixture: ComponentFixture<UserForgotUpdatePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserForgotUpdatePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForgotUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
