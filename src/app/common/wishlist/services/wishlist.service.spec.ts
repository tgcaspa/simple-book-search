import { TestBed } from '@angular/core/testing';

import { WishlistService } from './wishlist.service';

describe('WishlistService', () => {
  let wishlistService: WishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishlistService]
    });
    wishlistService = TestBed.inject(WishlistService);
  });

  it('should be created', () => {
    expect(wishlistService).toBeTruthy();
  });
});
