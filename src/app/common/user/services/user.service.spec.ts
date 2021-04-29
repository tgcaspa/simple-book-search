import { TestBed } from '@angular/core/testing';

import { UserStore } from '../state/user.store';
import { UserService } from './user.service';

describe('UserService', () => {
  let userStoreSpy: jasmine.SpyObj<UserStore>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserStore, useValue: jasmine.createSpyObj('UserStore', ['update']) },
        UserService
      ]
    });
    userStoreSpy = TestBed.inject(UserStore) as jasmine.SpyObj<UserStore>;
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('#loadUser', () => {

    it('should update store with given user\'s data', () => {
      const user = {
        username: 'Dmitry Hershkovich'
      };
      userService.loadUser(user).subscribe(
        result => {
          expect(userStoreSpy.update).toHaveBeenCalledTimes(1);

          expect(result).toEqual(user);
        },
        fail
      );
    });
  });
});
