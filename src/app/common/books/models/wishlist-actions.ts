import { BookItem } from "../state/book.model";

export abstract class OnRemoveFromWishlistActionRef {
  abstract removeFromWishlist(bookItem: BookItem): void;
}
