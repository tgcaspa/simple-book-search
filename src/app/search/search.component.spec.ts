import { ReactiveFormsModule } from "@angular/forms";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NG_ENTITY_SERVICE_CONFIG } from "@datorama/akita-ng-entity-service";

import { BooksModule } from "../common/books/books.module";
import { ResultsContainerModule } from "../common/results-container/results-container.module";
import { SearchComponent } from './search.component';
import { SearchService } from "./services/search.service";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BooksModule,
        ResultsContainerModule
      ],
      declarations: [SearchComponent],
      providers: [
        {
          provide: NG_ENTITY_SERVICE_CONFIG,
          useValue: { baseUrl: 'https://www.googleapis.com/books/v1' }
        },
        SearchService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
