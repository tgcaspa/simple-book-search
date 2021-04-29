import { EntityState } from "@datorama/akita";

export interface BooksVolumesResponse {
  kind: string
  totalItems: number;
  items: BookItem[];
}

export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors: string[];
  categories: string[];
  description?: string;
  language: string;
  imageLinks: {
    thumbnail: string
  };
  averageRating?: number;
  pageCount?: number;
}

export interface BookItem {
  id: string;
  volumeInfo: VolumeInfo;
  isWishlish?: boolean;
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
    categories: data?.volumeInfo?.categories,
    description: data?.volumeInfo?.description,
    averageRating: data?.volumeInfo?.averageRating,
    language: data?.volumeInfo?.language,
    imageLinks: {
      thumbnail: data?.volumeInfo?.imageLinks?.thumbnail
    },
    pageCount: data?.volumeInfo?.pageCount
  },
  isWishlish: data?.isWishlish === true
});

export const extractBookEntities = (response: BooksVolumesResponse): BookItem[] => (response?.items || []).map(extractBookData);
