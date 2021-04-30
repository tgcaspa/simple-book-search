import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';

import { BooksVolumesResponse } from '../../common/books/state/book.model';
import { SearchQuery } from '../state/search/search.query';
import { SearchService } from './search.service';
import { BookItem } from 'src/app/common/books/state/book.model';

const booksVolumesResponse: BooksVolumesResponse = {
  kind: "books#volumes",
  totalItems: 1,
  items: [
    {
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
    }
  ]
};

describe('SearchService', () => {
  let searchQuerySpy: jasmine.SpyObj<SearchQuery>;
  let searchService: SearchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: NG_ENTITY_SERVICE_CONFIG,
          useValue: { baseUrl: 'https://www.googleapis.com/books/v1' }
        },
        { provide: SearchQuery, useValue: jasmine.createSpyObj('SearchQuery', ['getValue']) },
        SearchService
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    searchQuerySpy = TestBed.inject(SearchQuery) as jasmine.SpyObj<SearchQuery>;
    searchService = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(searchService).toBeTruthy();
  });

  describe('#search', () => {

    beforeEach(() => {
      searchQuerySpy.getValue.and.returnValue({
        maxResults: 20,
        startIndex: 0,
        totalItems: 0
      });
    });

    it('should set empty entities if no value was speficied', () => {
      const input = '';

      searchService.search(input).subscribe(
        (result: BookItem[]) => expect(result?.length).toBe(0, 'Length of items shold be 0'),
        fail
      );
    });

    it('shoud GET books volumes items', () => {
      const input = 'bonnie';

      searchService.search(input).subscribe(
        (result: BookItem[]) => {
          // Has results.
          expect(result?.length).toBe(booksVolumesResponse.totalItems);
          // Result data is equal to extracted items from a response.
          expect(result).toEqual(booksVolumesResponse.items);
        },
        fail
      );

      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL
      // `expectOne()` would throw.
      const req = httpTestingController.expectOne(`https://www.googleapis.com/books/v1/volumes?q=${input}&startIndex=0&maxResults=20`);

      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      req.flush(booksVolumesResponse);

      // Finally, assert that there are no outstanding requests.
      httpTestingController.verify();
    });
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
