import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
    SearchRoutingModule
  ],
  providers: [
    SearchService
  ]
})
export class SearchModule { }
