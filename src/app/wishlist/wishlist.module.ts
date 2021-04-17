import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    WishlistRoutingModule
  ]
})
export class WishlistModule { }
