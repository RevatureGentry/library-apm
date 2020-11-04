import Vue from 'vue'
import Vuex from 'vuex'
import {AuthModule, AuthState} from "@/store/auth.state";
import {AuthorModule, AuthorState} from "@/store/author.state";
import {ReviewModule, ReviewState} from "@/store/reviews.state";
import {UiModule, UiState} from "@/store/ui.state";

Vue.use(Vuex)

export interface State {
  auth: AuthState;
  author: AuthorState;
  review: ReviewState;
  ui: UiState;
}

export default new Vuex.Store({
  modules: {
    auth: AuthModule,
    author: AuthorModule,
    review: ReviewModule,
    ui: UiModule
  }
})
