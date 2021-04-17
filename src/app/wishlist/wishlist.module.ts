import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsContainerModule } from '../common/results-container/results-container.module';
import { BooksModule } from '../common/books/books.module';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';


@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    CommonModule,
    BooksModule,
    ResultsContainerModule,
    WishlistRoutingModule
  ]
})
export class WishlistModule { }
