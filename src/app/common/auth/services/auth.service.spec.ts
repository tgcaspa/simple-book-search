import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EntityStore, Store, StoreConfig } from '@datorama/akita';

import { BooksState } from '../../books/state/book.model';
import { UserState } from '../../user/state/user.model';

import { AuthService } from './auth.service';

@StoreConfig({ name: 'user', resettable: true })
export class UserStore extends Store<UserState> {
  constructor() {
    super({
      username: ''
    });
  }
}

@StoreConfig({ name: 'wishlist', resettable: true })
export class WishlistStore extends EntityStore<BooksState> {
  constructor() {
    super();
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let routerServiceSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerServiceSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerServiceSpy }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#logout', () => {
    let user;
    let wishlist;

    beforeEach(() => {
      user = new UserStore();
      user.update({ username: 'Dmitry Hershkovich' });

      wishlist = new WishlistStore();
      wishlist.add([{
        id: '--0rAAAAIAAJ',
        isWishlish: true,
        volumeInfo: {
          'title': 'Proceedings of the Senate Sitting for the Trial of William W. Belknap, Late Secretary of War, on the Articles of Impeachment Exhibited by the House of Representatives',
          'authors': [
            'William Worth Belknap'
          ],
          'categories': [
            'Trials (Impeachement)'
          ],
          'language': 'en',
          'imageLinks': {
            'thumbnail': 'http://books.google.com/books/content?id=--0rAAAAIAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          'pageCount': 1166
        }
      }]);
    });

    it('should reset all stores states', () => {
      const expected = {
        user: {
          username: '',
        },
        wishlist: {
          ids: [],
          entities: {},
          loading: true,
          error: null
        }
      };

      service.logout().subscribe(
        () => expect({ user: user._value(), wishlist: wishlist._value() }).toEqual(expected),
        fail
      );
    });

    it('should navigate to root', () => {
      routerServiceSpy.navigateByUrl.and.returnValue(Promise.resolve(true));

      service.logout().subscribe(
        () => expect(routerServiceSpy.navigateByUrl).toHaveBeenCalledOnceWith('/'),
        fail
      );
    });

    it('should logout with result true', () => {
      service.logout().subscribe(
        result => expect(result).toBeTruthy(),
        fail
      );
    });
  });
});
