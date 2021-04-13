import { EntityState } from "@datorama/akita";

export interface BooksVolumesResponse {
  kind: string
  totalItems: number;
  items: BookItem[];
}

export interface VolumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  description: string;
  averageRating: number;
  imageLinks: {
    thumbnail: string
  };
}

export interface BookItem {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface BooksState extends EntityState<BookItem, BookItem['id']> { }

export const createInitialBookState = (): BooksState => ({
  ids: [],
  entities: {},
  loading: false,
  error: null
});

export const extractBookData = (data: BookItem): BookItem => ({
  id: data?.id,
  volumeInfo: {
    title: data?.volumeInfo?.title,
    subtitle: data?.volumeInfo?.subtitle,
    authors: data?.volumeInfo?.authors,
    description: data?.volumeInfo?.description,
    averageRating: data?.volumeInfo?.averageRating,
    imageLinks: {
      thumbnail: data?.volumeInfo?.imageLinks?.thumbnail
    }
  }
});

export const extractBookEntities = (response: BooksVolumesResponse): BookItem[] => (response?.items || []).map(extractBookData);
