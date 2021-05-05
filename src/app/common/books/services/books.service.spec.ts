import { TestBed } from '@angular/core/testing';

import { BookItem } from '../state/book.model';
import { BooksService } from './books.service';
import { BooksStore } from "src/app/common/books/state/books.store";

const bookItem: BookItem = {
  id: '--0rAAAAIAAJ',
  volumeInfo: {
    title: 'Proceedings of the Senate Sitting for the Trial of William W. Belknap, Late Secretary of War, on the Articles of Impeachment Exhibited by the House of Representatives',
    subtitle: 'subtitle',
    authors: [
      'William Worth Belknap'
    ],
    categories: [
      'Trials (Impeachement)'
    ],
    description: 'description',
    averageRating: 3,
    language: 'en',
    imageLinks: {
      thumbnail: 'http://books.google.com/books/content?id=--0rAAAAIAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    pageCount: 1166
  },
  isWishlish: false
};

describe('BooksService', () => {
  let booksStoreSpy: jasmine.SpyObj<BooksStore>;
  let booksService: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BooksStore, useValue: jasmine.createSpyObj('BooksStore', ['setActive', 'removeActive', 'reset']) },
        BooksService
      ]
    });
    booksStoreSpy = TestBed.inject(BooksStore) as jasmine.SpyObj<BooksStore>;
    booksService = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(booksService).toBeTruthy();
  });

  describe('#setActive', () => {

    it('should set active book item by id', () => {
      booksService.setActive(bookItem);

      expect(booksStoreSpy.setActive).toHaveBeenCalledOnceWith(bookItem.id);
    });
  });

  describe('#removeActive', () => {

    it('should remove active book item by id', () => {
      booksService.removeActive(bookItem);

      expect(booksStoreSpy.removeActive).toHaveBeenCalledOnceWith(bookItem.id);
    });
  });

  describe('#reset', () => {

    it('should reset books store', () => {
      booksService.reset();

      expect(booksStoreSpy.reset).toHaveBeenCalledTimes(1);
    });
  });
});
