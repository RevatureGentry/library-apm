import {Book, Review} from "@/types/library";
import {State} from "@/store/index";
import {Module} from "vuex";
import {findReviewsForBook, submitComment, submitReview} from "@/api/reviews";
import {UiActions} from "@/store/ui.state";
import {CommentForm} from "@/types/forms";
import Vue from 'vue';
import { apm } from '@elastic/apm-rum';

export interface ReviewState {
  reviews: { [K: number]: Review[] };
  isFetchingReviews: boolean;
}

const state: ReviewState = {
  reviews: {},
  isFetchingReviews: false
}

export enum ReviewGetters {
  FIND_BY_BOOK = 'findReviewsForBook',
  FIND_MY_REVIEWS = 'findMyReviews',
  IS_FETCHING_REVIEW = 'isFetchingReview'
}

export enum ReviewActions {
  FETCH_REVIEWS_FOR_BOOK = 'fetchReviewsForBook',
  SET_FETCHING_BOOK = 'setFetchingReviewsForBook',
  SUBMIT_REVIEW = 'submitReview',
  SUBMIT_COMMENT = 'submitComment',
}

enum ReviewMutations {
  SET_REVIEWS_FOR_BOOK = 'setReviewsForBook',
  SET_FETCHING_BOOK = 'setFetchingReviewsForBook',
  UPDATE_COMMENT_IN_LIST = 'updateCommentInList',
}

export const ReviewModule: Module<ReviewState, State> = {
  state,
  getters: {
    [ReviewGetters.FIND_BY_BOOK]: (state: ReviewState) => (bookId: number): Review[] => {
      return state.reviews[bookId];
    },
    [ReviewGetters.FIND_MY_REVIEWS]: (state: ReviewState) => (user: string): Review[] => {
      const reviews: Review[][] = Object.values(state.reviews);
      return reviews.flatMap(review => review).filter(review => review.reviewer === user);
    },
    [ReviewGetters.IS_FETCHING_REVIEW]: (state: ReviewState): boolean => {
      return state.isFetchingReviews;
    }
  },
  actions: {
    [ReviewActions.FETCH_REVIEWS_FOR_BOOK]: ({ commit, dispatch }, book: Book) => {
      dispatch(ReviewActions.SET_FETCHING_BOOK, { isFetching: true })
        .then(() => findReviewsForBook(book))
        .then(
          (reviews: Review[]) => {
            commit(ReviewMutations.SET_REVIEWS_FOR_BOOK, { bookId: book.id, reviews });
            return dispatch(ReviewActions.SET_FETCHING_BOOK, { isFetching: false }).then(() => {});
          },
          () => {
            commit(ReviewMutations.SET_REVIEWS_FOR_BOOK, { bookId: book.id, reviews: [] });
            return dispatch(ReviewActions.SET_FETCHING_BOOK, { isFetching: false }).then(() => {});
          }
        );
    },
    [ReviewActions.SUBMIT_COMMENT]: ({ commit, dispatch }, payload: { form: CommentForm, book: Book}) => {
      submitComment(payload.form).then(
        (review: Review) => {
          commit(ReviewMutations.UPDATE_COMMENT_IN_LIST, { review, bookId: payload.book.id });
        }
      )
    },
    [ReviewActions.SET_FETCHING_BOOK]: ({ commit }, payload: { isFetching: boolean }) => {
      commit(ReviewMutations.SET_FETCHING_BOOK, payload);
    },
    [ReviewActions.SUBMIT_REVIEW]: ({ commit, dispatch }, payload: { review: Review, book: Book}) => {
      submitReview(payload.review).then(
        (review: Review) => {
          return dispatch(UiActions.REVIEW_SUBMISSION_SUCCESS, payload.book);
        },
        () => {
          return dispatch(UiActions.REVIEW_SUBMISSION_FAILURE);
        }
      )
    }
  },
  mutations: {
    [ReviewMutations.SET_REVIEWS_FOR_BOOK]: (state: ReviewState, payload: { bookId: number, reviews: Review[] }) => {
      Vue.set(state.reviews, payload.bookId, payload.reviews);
    },
    [ReviewMutations.SET_FETCHING_BOOK]: (state: ReviewState, payload: { isFetching: boolean }) => {
      state.isFetchingReviews = payload.isFetching;
    },
    [ReviewMutations.UPDATE_COMMENT_IN_LIST]: (state: ReviewState, payload: { review: Review, bookId: number }) => {
      const reviews = state.reviews[payload.bookId] ?? [];
      const updatedReviews = reviews.map(review => {
        if (review.id === payload.review.id) {
          return payload.review;
        }
        return review;
      });
      Vue.set(state.reviews, payload.bookId, updatedReviews);
    }
  }
}
