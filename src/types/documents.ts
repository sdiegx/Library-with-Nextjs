interface Document {
  id: number;
  title: string;
  publisher: string;
  publicationDate: string;
  genre: string;
  summary: string;
  language: string;
  pageCount: number;
  physicalLocation: string;
  available: boolean;
  numberOfCopies: number;
  deletedAt?: string | null;
  authors: Author[];
}
