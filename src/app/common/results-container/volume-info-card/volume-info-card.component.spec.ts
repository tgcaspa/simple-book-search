import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { BooksService } from '../../books/services/books.service';
import { BookItem } from '../../books/state/book.model';
import { WishlistService } from '../../wishlist/services/wishlist.service';
import { VolumeInfoCardComponent } from './volume-info-card.component';

const bookItem: BookItem = {
  id: '--0rAAAAIAAJ',
  isWishlish: false,
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
};

describe('VolumeInfoCardComponent', () => {
  let modalService: BsModalService;
  let booksServiceSpy: jasmine.SpyObj<BooksService>;
  let wishlistServiceSpy: jasmine.SpyObj<WishlistService>;
  let component: VolumeInfoCardComponent;
  let fixture: ComponentFixture<VolumeInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      declarations: [VolumeInfoCardComponent],
      providers: [
        BsModalService,
        { provide: BooksService, useValue: jasmine.createSpyObj('BooksService', ['setActive', 'removeActive']) },
        { provide: WishlistService, useValue: jasmine.createSpyObj('WishlistService', ['remove']) }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    modalService = TestBed.inject(BsModalService);
    booksServiceSpy = TestBed.inject(BooksService) as jasmine.SpyObj<BooksService>;
    wishlistServiceSpy = TestBed.inject(WishlistService) as jasmine.SpyObj<WishlistService>;
    fixture = TestBed.createComponent(VolumeInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#showMoreDetails', () => {

    it('should not set active into books store if disableShowMoreDetails is true', () => {
      component.disableShowMoreDetails = true;

      component.showMoreDetails();

      expect(booksServiceSpy.setActive).toHaveBeenCalledTimes(0);
    });

    it('should not show more details if disableShowMoreDetails is true', fakeAsync(() => {
      component.disableShowMoreDetails = true;

      component.showMoreDetails();

      flush();

      expect(modalService.getModalsCount()).toBe(0);
    }));

    it('should set active into books store if disableShowMoreDetails is false', () => {
      component.disableShowMoreDetails = false;
      component.bookItem = bookItem;

      component.showMoreDetails();

      expect(booksServiceSpy.setActive).toHaveBeenCalledWith(bookItem);
    });

    it('should show more details if disableShowMoreDetails is false', fakeAsync(() => {
      component.disableShowMoreDetails = false;

      component.showMoreDetails();

      flush();

      expect(modalService.getModalsCount()).toBe(1);
    }));

    it('should remove active from store on model hidden', fakeAsync(() => {
      booksServiceSpy.removeActive.and.returnValue(undefined);

      component.disableShowMoreDetails = false;
      component.bookItem = bookItem;

      modalService.onShown.subscribe(() => modalService.hide());

      component.showMoreDetails();

      flush();

      expect(booksServiceSpy.removeActive).toHaveBeenCalledOnceWith(bookItem);
    }));
  });

  describe('#onRemoveFromWishlist', () => {

    it('should remove book item from wishlist store', () => {
      component.onRemoveFromWishlist(bookItem);

      expect(wishlistServiceSpy.remove).toHaveBeenCalledOnceWith(bookItem);
    });
  });

  afterEach(() => {
    if (modalService.getModalsCount() > 0) {
      modalService.hide();
    }
  });
});
