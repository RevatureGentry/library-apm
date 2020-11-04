import {State} from "@/store/index";
import {Module} from "vuex";
import {ReviewActions} from "@/store/reviews.state";
import {Book} from "@/types/library";

export interface UiState {
  authMessage: AlertState;
  review: AlertState;
}

export interface AlertState {
  message: string;
  type: 'error' | 'success' | '';
}

const state: UiState = {
  authMessage: {
    message: '',
    type: ''
  },
  review: {
    message: '',
    type: ''
  },
}

export enum UiGetters {
  AUTH_ERROR_MESSAGE = 'getAuthErrorMessage',
  REVIEW_ALERT = 'getReviewAlert'
}

export enum UiActions {
  SET_AUTH_ERROR_MESSAGE = 'setAuthErrorMessage',
  CLEAR_AUTH_ERROR_MESSAGE = 'clearAuthErrorMessage',
  REVIEW_SUBMISSION_SUCCESS = 'reviewSubmissionSuccess',
  REVIEW_SUBMISSION_FAILURE = 'reviewSubmissionFailure',
  CLEAR_SUBMISSION_MESSAGE = 'clearSubmissionMessage',
  CLEAR_ALL_MESSAGES = 'clearAllMessages'
}

enum UiMutations {
  SET_AUTH_ERROR_MESSAGE = 'setAuthErrorMessage',
  CLEAR_AUTH_ERROR_MESSAGE = 'clearAuthErrorMessage',
  SET_SUBMISSION_STATUS = 'setSubmissionStatus',
  CLEAR_SUBMISSION_MESSAGE = 'clearSubmissionMessage',
  CLEAR_ALL_MESSAGES = 'clearAllMessages'
}

export const UiModule: Module<UiState, State> = {
  state,
  getters: {
    [UiGetters.AUTH_ERROR_MESSAGE]: (state: UiState): AlertState => {
      return state.authMessage;
    },
    [UiGetters.REVIEW_ALERT]: (state: UiState): AlertState => {
      return state.review;
    }
  },
  actions: {
    [UiActions.SET_AUTH_ERROR_MESSAGE]: ({ commit }, payload: { message: string, success: boolean }) => {
      commit(UiMutations.SET_AUTH_ERROR_MESSAGE, payload);
    },
    [UiActions.CLEAR_AUTH_ERROR_MESSAGE]: ({ commit }) => {
      commit(UiMutations.CLEAR_AUTH_ERROR_MESSAGE);
    },
    [UiActions.REVIEW_SUBMISSION_SUCCESS]: ({ commit, dispatch }, book: Book) => {
      dispatch(ReviewActions.FETCH_REVIEWS_FOR_BOOK, book).then(() => {
        commit(UiMutations.SET_SUBMISSION_STATUS, { message: 'Review created successfully!', type: 'success' })
      })
    },
    [UiActions.REVIEW_SUBMISSION_FAILURE]: ({ commit }) => {
      commit(UiMutations.SET_SUBMISSION_STATUS, { message: 'Failed to create review', type: 'failure' })
    },
    [UiActions.CLEAR_SUBMISSION_MESSAGE]: ({ commit }) => {
      commit(UiMutations.CLEAR_SUBMISSION_MESSAGE);
    },
    [UiActions.CLEAR_ALL_MESSAGES]: ({ commit }) => {
      commit(UiMutations.CLEAR_ALL_MESSAGES);
    }
  },
  mutations: {
    [UiMutations.SET_AUTH_ERROR_MESSAGE]: (state: UiState, payload: { message: string, success: boolean }) => {
      state.authMessage = { message: payload.message, type: payload.success ? 'success' : 'error' }
    },
    [UiMutations.CLEAR_AUTH_ERROR_MESSAGE]: (state: UiState) => {
      state.authMessage = {
        message: '',
        type: ''
      }
    },
    [UiMutations.SET_SUBMISSION_STATUS]: (state: UiState, alertState: AlertState) => {
      state.review = alertState;
    },
    [UiMutations.CLEAR_SUBMISSION_MESSAGE]: (state: UiState) => {
      state.review = { message: '', type: '' };
    },
    [UiMutations.CLEAR_ALL_MESSAGES]: (state: UiState) => {
      state.authMessage = {
        message: '',
        type: ''
      }
      state.review = {
        message: '',
        type: ''
      }
    }
  }
}
