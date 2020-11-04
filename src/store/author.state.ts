import {Author, Book} from "@/types/library";
import {State} from "@/store/index";
import {Module} from "vuex";
import {findAllAuthors, findBooksForAuthor} from "@/api/author";
import { apm } from '@elastic/apm-rum';

export interface AuthorState {
  shouldFetch: boolean;
  isFetching: boolean;
  authors: Author[];
}

const state: AuthorState = {
  shouldFetch: true,
  isFetching: false,
  authors: [] as Author[]
}

export enum AuthorGetters  {
  FIND_ALL = 'findAllAuthors',
  FIND_BY_ID = 'findAuthorById',
  FIND_NAME_BY_ID = 'findAuthorNameById',
  FIND_ALL_BOOKS = 'findAllBooks',
  FIND_BOOK_BY_ID = 'findBookById',
  FIND_BOOKS_BY_AUTHOR_ID = 'findBooksByAuthorId'
}

export enum AuthorActions {
  FETCH_ALL = 'fetchAllAuthors',
  FIND_BOOKS_FOR_AUTHOR = 'fetchAuthorBooks'
}

enum AuthorMutations {
  SET_AUTHORS = 'setAuthors',
  SET_IS_FETCHING = 'setIsFetchingAuthors',
  SET_SHOULD_FETCH = 'setShouldFetchAuthors',
  SET_BOOKS_FOR_AUTHOR = 'setBooksForAuthor'
}

export const AuthorModule: Module<AuthorState, State> = {
  state,
  getters: {
    [AuthorGetters.FIND_ALL]: (state: AuthorState): Author[] => {
      return state.authors;
    },
    [AuthorGetters.FIND_BY_ID]: (state: AuthorState) => (id: number): Author | undefined => {
      return state.authors.find(author => author.id === id);
    },
    [AuthorGetters.FIND_ALL_BOOKS]: (state: AuthorState): Book[] => {
      return state.authors.flatMap(author => author.books ?? [])
    },
    [AuthorGetters.FIND_NAME_BY_ID]: (state: AuthorState) => (id: number): string | undefined => {
      const author: Author | undefined = state.authors.find(author => author.id === id);
      if (author) {
        return `${author.firstName} ${author.lastName}`;
      }
    },
    [AuthorGetters.FIND_BOOK_BY_ID]: (state: AuthorState) => (bookId: number): Book | undefined => {
      return state.authors.flatMap(author => author.books ?? []).find(book => book.id === bookId);
    },
    [AuthorGetters.FIND_BOOKS_BY_AUTHOR_ID]: (state: AuthorState) => (authorId: number): Book[] => {
      return state.authors.flatMap(author => author.books ?? []).filter(book => book.authorId === authorId);
    }
  },
  actions: {
    [AuthorActions.FETCH_ALL]: ({ commit, state, dispatch }) => {
      if (state.shouldFetch) {
        commit(AuthorMutations.SET_IS_FETCHING, true);
        findAllAuthors().then(
          (authors: Author[]) => {
            commit(AuthorMutations.SET_AUTHORS, authors);
            authors.forEach(async author => {
              await dispatch(AuthorActions.FIND_BOOKS_FOR_AUTHOR, author)
            })
          }
        ).finally(
          () => {
            commit(AuthorMutations.SET_IS_FETCHING, false);
          }
        )
      }
    },
    [AuthorActions.FIND_BOOKS_FOR_AUTHOR]: ({ commit }, author: Author) => {
      findBooksForAuthor(author).then(
        (books: Book[]) => {
          commit(AuthorMutations.SET_BOOKS_FOR_AUTHOR, { authorId: author.id, books })
        }
      )
    }
  },
  mutations: {
    [AuthorMutations.SET_AUTHORS]: (state: AuthorState, authors: Author[]) => {
      state.authors = authors;
    },
    [AuthorMutations.SET_IS_FETCHING]: (state: AuthorState, isFetching: boolean) => {
      state.isFetching = isFetching;
    },
    [AuthorMutations.SET_SHOULD_FETCH]: (state: AuthorState, shouldFetch: boolean) => {
      state.shouldFetch = shouldFetch;
    },
    [AuthorMutations.SET_BOOKS_FOR_AUTHOR]: (state: AuthorState, payload: { authorId: number, books: Book[] }) => {
      const authors: Author[] = state.authors;
      const author: Author | undefined = state.authors.find(a => a.id === payload.authorId);
      if (author) {
        author.books = payload.books;
        state.authors = authors.map(a => {
          if (a.id === author.id) {
            return author;
          }
          return a;
        })
      }
    }
  }
}
