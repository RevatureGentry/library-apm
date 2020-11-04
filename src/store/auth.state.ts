import Vue from 'vue';
import {Token, User} from "@/types/auth";
import {State} from "@/store/index";
import {Module} from "vuex";
import {EmailPasswordForm} from "@/types/forms";
import {
  attemptEmailPasswordAuthentication,
  attemptRegistration,
  FirebaseAuthError,
  FirebaseUser,
  FirebaseUserCredential,
  isFirebaseUser
} from "@/plugins/firebase";
import {setBearerHeader} from "@/plugins/axios";
import {UiActions} from "@/store/ui.state";

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: {} as User
}

const isAuthState = (state: any): state is AuthState => {
  return state !== undefined && 'user' in state;
}

export enum AuthGetters {
  IS_AUTHENTICATED = 'isAuthenticated',
  CURRENT_USER = 'getCurrentUser'
}

export enum AuthActions {
  ATTEMPT_FORM_AUTHENTICATION = 'attemptFormAuthentication',
  ATTEMPT_REGISTRATION = 'attemptRegistration',
  SET_USER_FROM_AUTH_SUCCESS = 'setUserFromSuccessfulAuthentication',
  SIGN_OUT = 'signOut'
}

export enum AuthMutations {
  CLEAR_USER_STATE = 'clearUserState',
  AUTHENTICATION_SUCCESS = 'authenticationSuccess',
  AUTHENTICATION_FAILURE = 'authenticationFailure',
}

export const AuthModule: Module<AuthState, State> = {
  state: initialState,
  getters: {
    [AuthGetters.IS_AUTHENTICATED]: (state: AuthState): boolean => {
      if (isAuthState(state)) {
        return !!state.user.email && !!state.user.token && !!state.user.token.idToken;
      }
      return false;
    },
    [AuthGetters.CURRENT_USER]: (state: AuthState): User | undefined => {
      if (isAuthState(state)) {
        return state.user;
      }
      return undefined;
    }
  },
  mutations: {
    [AuthMutations.AUTHENTICATION_SUCCESS]: (state: AuthState, user: User) => {
      state.user = user;
    },
    [AuthMutations.CLEAR_USER_STATE]: (state: AuthState) => {
      state.user = {} as User;
    },
  },
  actions: {
    [AuthActions.ATTEMPT_FORM_AUTHENTICATION]: ({ commit, dispatch }, payload: { form: EmailPasswordForm }) => {
      attemptEmailPasswordAuthentication(payload.form).then(
        (user: FirebaseUserCredential) => {
          return dispatch(AuthActions.SET_USER_FROM_AUTH_SUCCESS, user?.user);
        },
        (authError: FirebaseAuthError) => {
          return dispatch(UiActions.SET_AUTH_ERROR_MESSAGE, { message: 'Invalid Credentials', success: false });
        }
      )
    },
    [AuthActions.SET_USER_FROM_AUTH_SUCCESS]: ({ commit, dispatch}, user: FirebaseUser | null) => {
      if (isFirebaseUser(user)) {
        const { email, refreshToken } = user;
        user.getIdToken().then(
          idToken => {
            const token = { idToken, refreshToken } as Token;
            setBearerHeader(token);
            commit(AuthMutations.AUTHENTICATION_SUCCESS, { email, token } as User);
          },
          (authError: FirebaseAuthError) => {
            return dispatch(UiActions.SET_AUTH_ERROR_MESSAGE, { message: 'Invalid Credentials', success: false });
          }
        )
      }
    },
    [AuthActions.ATTEMPT_REGISTRATION]: ({ dispatch }, payload: { form: EmailPasswordForm }) => {
      attemptRegistration(payload.form).then(
        (user: FirebaseUserCredential) => {
          return dispatch(AuthActions.SET_USER_FROM_AUTH_SUCCESS, user?.user);
        },
        (firebaseError: FirebaseAuthError) => {
          switch(firebaseError.code) {
            case 'auth/email-already-in-use':
              return dispatch(UiActions.SET_AUTH_ERROR_MESSAGE, { message: 'Registration Failed: Email already in use', success: false });
            default:
              return dispatch(UiActions.SET_AUTH_ERROR_MESSAGE, { message: 'Registration Failed', success: false });
          }
        }
      )
    },
    [AuthActions.SIGN_OUT]: ({ commit }) => {
      commit(AuthMutations.CLEAR_USER_STATE);
    }
  }
}
