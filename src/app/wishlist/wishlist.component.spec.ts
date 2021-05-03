import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { WishlistComponent } from './wishlist.component';
import { WishlistQuery } from '../common/wishlist/state/wishlist.query';
import { BookItem } from '../common/books/state/book.model';
import { ResultsContainerModule } from "src/app/common/results-container/results-container.module";
import { BooksModule } from "src/app/common/books/books.module";

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

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BooksModule,
        ResultsContainerModule
      ],
      declarations: [WishlistComponent],
      providers: [
        {provide: WishlistQuery, useValue: jasmine.createSpyObj('WishlistQuery', {selectAll: of(wishlistItems)})}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init books items on init', () => {
    component.books$.subscribe(
      (bookItems: BookItem[]) => expect(bookItems).toEqual(wishlistItems),
      fail
    );
  });
});
