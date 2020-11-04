<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        align-self="stretch"
      >
        <v-form
          novalidate
          v-model="valid"
        >
          <v-card>
            <v-card-title>Add your Review</v-card-title>
            <v-card-subtitle>{{ book(bookId).title }}</v-card-subtitle>
            <v-card-text>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <v-textarea
                  v-model="content"
                  label="Your Review"
                  outlined
                  full-width
                  counter
                  :error-messages="errors"
                  :error-count="errors.length"
                >
                </v-textarea>
              </ValidationProvider>
              <ValidationProvider rules="rating|required" v-slot="{ errors }">
                <v-input
                  outlined
                  label="Your Rating"
                  :error-messages="errors"
                  :error-count="errors.length"
                  :value="rating"
                >
                  <v-rating
                    half-increments
                    hover
                    length="5"
                    v-model="rating"
                  >
                  </v-rating>
                </v-input>
              </ValidationProvider>
            </v-card-text>
            <v-card-actions>
              <v-row
                align="center"
                justify="space-between"
              >
                <v-col>
                  <v-btn
                    type="submit"
                    block
                    color="green"
                    @click.prevent="handleSubmission"
                  >
                    Submit Review
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    type="reset"
                    block
                    color="red"
                    @click.prevent="handleReset"
                  >
                    Reset
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
            <v-row
              align="center"
              justify="center"
            >
              <v-col
                class="mx-2"
              >
                <v-btn
                  type="button"
                  block
                  color="blue"
                  :to="{ path: `/books/${bookId}/reviews` }"
                >
                  See all Reviews
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
          <div v-if="reviewAlertState.message !== ''">
            <v-alert
              outlined
              :type="reviewAlertState.type"
            >
              {{ reviewAlertState.message }}
            </v-alert>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {extend, setInteractionMode, ValidationProvider} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';
import {mapGetters} from "vuex";
import {AuthorGetters} from "@/store/author.state";
// eslint-disable-next-line no-unused-vars
import {Review} from "@/types/library";
import {ReviewActions} from "@/store/reviews.state";
import {UiActions, UiGetters} from "@/store/ui.state";

setInteractionMode('lazy');

extend('required', {
  ...required,
  message: '{_field_} is required'
});

extend('rating', (value: string): boolean | string => {
    const asNumber: number = +value;
    return (asNumber >= 0 && asNumber <= 5) || 'Please rate between 0 and 5 stars';
});

export default Vue.extend({
  name: "ReviewForm",
  props: {
    bookId: Number
  },
  data() {
    return {
      valid: false,
      rating: 2.5,
      content: ''
    }
  },
  components: {
    ValidationProvider
  },
  computed: {
    ...mapGetters({
      'book': AuthorGetters.FIND_BOOK_BY_ID,
      'reviewAlertState': UiGetters.REVIEW_ALERT
    })
  },
  mounted() {
    this.$store.dispatch(UiActions.CLEAR_ALL_MESSAGES);
  },
  methods: {
    handleSubmission() {
      const review: Review = {
        rating: this.rating,
        bookId: this.bookId,
        content: this.content
      }
      const targetBook = this.book(this.bookId)
      this.$store.dispatch(ReviewActions.SUBMIT_REVIEW, { review, book: targetBook});
    },
    handleReset() {
      this.rating = 0;
      this.content = '';
    }
  },
})
</script>

<style>

</style>
