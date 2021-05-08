import { TestBed } from '@angular/core/testing';

import { UserStore } from '../state/user.store';
import { UserService } from './user.service';

describe('UserService', () => {
  let userStoreSpy: jasmine.SpyObj<UserStore>;
  let userService: UserService;

  beforeEach(() => {
    userStoreSpy = jasmine.createSpyObj('UserStore', ['update']);

    TestBed.configureTestingModule({
      providers: [
        { provide: UserStore, useValue: userStoreSpy },
        UserService
      ]
    });
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
