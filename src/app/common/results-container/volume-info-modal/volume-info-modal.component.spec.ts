import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';

import { BookItem } from '../../books/state/book.model';
import { BooksQuery } from '../../books/state/books.query';
import { WishlistService } from '../../wishlist/services/wishlist.service';
import { WishlistQuery } from '../../wishlist/state/wishlist.query';
import { VolumeInfoModalComponent } from './volume-info-modal.component';

const wishlistItems: BookItem[] = [
  {
    id: 'KODWBVNNPLOE',
    volumeInfo: {
      title: 'Book 1',
      subtitle: 'subtitle 1',
      authors: [],
      categories: [],
      description: 'description 1',
      averageRating: 3,
      language: 'en',
      imageLinks: {
        thumbnail: 'http://books.google.com/books/content?id=KODWBVNNPLOE&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
      },
      pageCount: 1166
    },
    isWishlish: true
  },
  {
    id: 'VHOEAAOOPLIJ',
    volumeInfo: {
      title: 'Book 2',
      subtitle: 'subtitle 2',
      authors: [],
      categories: [],
      description: 'description 2',
      averageRating: 3,
      language: 'en',
      imageLinks: {
        thumbnail: 'http://books.google.com/books/content?id=VHOEAAOOPLIJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
      },
      pageCount: 1166
    },
    isWishlish: true
  }
];

const bookActiveItem: BookItem = {
  id: 'KODWBVNNPLOE',
  volumeInfo: {
    title: 'Book 1',
    subtitle: 'subtitle 1',
    authors: [],
    categories: [],
    description: 'description 1',
    averageRating: 3,
    language: 'en',
    imageLinks: {
      thumbnail: 'http://books.google.com/books/content?id=KODWBVNNPLOE&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    pageCount: 1166
  },
  isWishlish: false
};

describe('VolumeInfoModalComponent', () => {
  let modalServiceSpy: jasmine.SpyObj<BsModalService>;
  let booksQuerySpy: jasmine.SpyObj<BooksQuery>;
  let wishlistServiceSpy: jasmine.SpyObj<WishlistService>;
  let wishlistQuerySpy: jasmine.SpyObj<WishlistQuery>;

  let component: VolumeInfoModalComponent;
  let fixture: ComponentFixture<VolumeInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      declarations: [VolumeInfoModalComponent],
      providers: [
        { provide: BsModalService, useValue: jasmine.createSpyObj('BsModalService', ['hide']) },
        { provide: BooksQuery, useValue: jasmine.createSpyObj('BooksQuery', ['selectActive']) },
        { provide: WishlistService, useValue: jasmine.createSpyObj('WishlistService', ['add']) },
        { provide: WishlistQuery, useValue: jasmine.createSpyObj('WishlistQuery', ['selectAll']) }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    modalServiceSpy = TestBed.inject(BsModalService) as jasmine.SpyObj<BsModalService>;
    booksQuerySpy = TestBed.inject(BooksQuery) as jasmine.SpyObj<BooksQuery>;
    wishlistServiceSpy = TestBed.inject(WishlistService) as jasmine.SpyObj<WishlistService>;
    wishlistQuerySpy = TestBed.inject(WishlistQuery) as jasmine.SpyObj<WishlistQuery>;
    fixture = TestBed.createComponent(VolumeInfoModalComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init bookItem$ that has wishlist\'s intersection', fakeAsync(() => {
    booksQuerySpy.selectActive.and.returnValue(of(bookActiveItem));
    wishlistQuerySpy.selectAll.and.returnValue(of(wishlistItems));

    fixture.detectChanges();

    const expected = {
      id: 'KODWBVNNPLOE',
      volumeInfo: {
        title: 'Book 1',
        subtitle: 'subtitle 1',
        authors: [],
        categories: [],
        description: 'description 1',
        averageRating: 3,
        language: 'en',
        imageLinks: {
          thumbnail: 'http://books.google.com/books/content?id=KODWBVNNPLOE&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
        },
        pageCount: 1166
      },
      isWishlish: true
    };

    component.bookItem$.subscribe(
      result => expect(result).toEqual(expected),
      fail
    );
  }));

  describe('#close', () => {

    it('should clone modal ref', () => {
      modalServiceSpy.hide.and.returnValue(undefined);

      component.close();

      expect(modalServiceSpy.hide).toHaveBeenCalledTimes(1);
    });
  });

  describe('#addToWishlist', () => {

    it('should add book item into wishlist store', () => {
      wishlistServiceSpy.add.and.returnValue(undefined);

      const bookItem = {
        ...bookActiveItem,
        isWishlish: false
      };
      const expected = {
        ...bookActiveItem,
        isWishlish: true
      };

      component.addToWishlist(bookItem);

      expect(wishlistServiceSpy.add).toHaveBeenCalledOnceWith(expected);
    });
  });
});
