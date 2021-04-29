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
    const user = {
      username: 'Dmitry Hershkovich'
    };

    it('should update store with the given user\'s data', () => {
      userService.loadUser(user).subscribe(
        () => expect(userStoreSpy.update).toHaveBeenCalledTimes(1),
        fail
      );
    });

    it('should return the same given user\'s data', () => {
      userService.loadUser(user).subscribe(
        result => expect(result).toEqual(user),
        fail
      );
    });
  });
});
