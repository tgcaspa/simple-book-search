import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';

describe('BooksService', () => {
  let booksService: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BooksService
      ]
    });
    booksService = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(booksService).toBeTruthy();
  });

  describe('#setActive', () => {

  });

  describe('#removeActive', () => {

  });

  describe('#reset', () => {

  });
});
