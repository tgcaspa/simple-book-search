import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthService } from './../../common/auth/services/auth.service';
import { LayoutHeaderComponent } from './layout-header.component';

describe('LayoutHeaderComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let component: LayoutHeaderComponent;
  let fixture: ComponentFixture<LayoutHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutHeaderComponent],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['logout']) },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(LayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onLogout', () => {

    it('should logout', () => {
      authServiceSpy.logout.and.returnValue(of(true));

      component.onLogout();

      expect(authServiceSpy.logout).toHaveBeenCalledTimes(1);
    });
  });
});
