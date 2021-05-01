import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Route, Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from './../../common/auth/services/auth.service';
import { LayoutHeaderComponent } from './layout-header.component';

const routerConfig = [
  {
    path: 'welcome',
    data: {
      title: 'Welcome',
      displayInMenu: false
    }
  },
  {
    path: 'search',
    data: {
      title: 'Search',
      displayInMenu: true
    }
  },
  {
    path: 'wishlist',
    data: {
      title: 'Wishlist',
      displayInMenu: true
    }
  },
];

describe('LayoutHeaderComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerServiceSpy: Router;
  let component: LayoutHeaderComponent;
  let fixture: ComponentFixture<LayoutHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LayoutHeaderComponent],
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', [], { config: routerConfig }) },
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

  describe('#getMenuItems', () => {
    let menuItems: Route[];

    beforeEach(() => {
      menuItems = component.getMenuItems();
    });

    it('should get menu items that defined as displayInMenu in route config', () => {
      expect(menuItems.length).toBe(2);

      const hasWelcomeItem = menuItems.find(item => item.path === 'welcome');
      expect(hasWelcomeItem).toBeUndefined();

      const hasSearchItem = menuItems.find(item => item.path === 'search');
      expect(hasSearchItem).toBeDefined();

      const hasWishlistItem = menuItems.find(item => item.path === 'wishlist');
      expect(hasWishlistItem).toBeDefined();
    });
  });

  describe('#onLogout', () => {

    it('should logout', () => {
      authServiceSpy.logout.and.returnValue(of(true));

      component.onLogout();

      expect(authServiceSpy.logout).toHaveBeenCalledTimes(1);
    });
  });
});
