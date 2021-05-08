import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { UserService } from '../common/user/services/user.service';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let routerServiceSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    routerServiceSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['loadUser']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [WelcomeComponent],
      providers: [
        { provide: Router, useValue: routerServiceSpy },
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create usernameControl with initial value', () => {
    expect(component.usernameControl.value).toBe('');
  });

  describe('#onContinue', () => {
    const input = 'Dmitry Hershkovich';

    it('should return undefined if usernameControl is invalid', () => {
      component.usernameControl.setValue('');
      component.usernameControl.setValidators([Validators.required]);
      component.usernameControl.updateValueAndValidity();

      expect(component.usernameControl.invalid).toBeTruthy(`Username value can't be empty.`);

      expect(component.onContinue()).toBeUndefined();
    });

    it('should load user if usernameControl is valid', () => {
      userServiceSpy.loadUser.and.returnValue(of({ username: input }));

      component.usernameControl.setValue(input);
      component.usernameControl.updateValueAndValidity();

      component.onContinue();

      expect(userServiceSpy.loadUser).toHaveBeenCalledTimes(1);
    });

    it('should navigate by url to the search screen on success', () => {
      userServiceSpy.loadUser.and.returnValue(of({ username: input }));

      component.usernameControl.setValue(input);
      component.usernameControl.updateValueAndValidity();

      component.onContinue();

      expect(routerServiceSpy.navigateByUrl).toHaveBeenCalledOnceWith('/search');
    });
  });
});
