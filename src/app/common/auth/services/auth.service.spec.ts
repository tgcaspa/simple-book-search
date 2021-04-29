import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

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
    const router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: router }
      ]
    });
    service = TestBed.inject(AuthService);
    routerServiceSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#logout', () => {
    let user;
    let wishlist;
    let logout$: Observable<boolean>;

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

      logout$ = service.logout().pipe(take(1));
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

      logout$.subscribe(
        () => expect({ user: user._value(), wishlist: wishlist._value() }).toEqual(expected),
        fail
      );
    });

    it('should navigate to root', () => {
      logout$.subscribe(
        () => expect(routerServiceSpy.navigateByUrl).toHaveBeenCalledOnceWith('/'),
        fail
      );
    });

    it('should logout with result true', () => {
      logout$.subscribe(
        result => expect(result).toBeTruthy(),
        fail
      );
    });
  });
});
