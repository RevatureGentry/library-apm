export interface Comment {
  id?: number;
  comment: string;
  commenter: string;
  createdOn?: string;
  lastModified?: string;
  comments?: Array<Comment>;
}

export interface Review {
  id?: number;
  bookId?: number;
  rating?: number;
  content: string;
  reviewer?: string;
  comments?: Array<Comment>;
  createdOn?: string;
  lastModified?: string;
}

export interface Book {
  id?: number;
  title: string;
  imageUrl: string;
  genres: Array<string>;
  authorId: number;
}

export interface Author {
  id?: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  books?: Array<Book>;
}
