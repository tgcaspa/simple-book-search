import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BooksModule } from '../common/books/books.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchService } from './services/search.service';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BooksModule,
    SearchRoutingModule
  ],
  providers: [
    SearchService
  ]
})
export class SearchModule { }
