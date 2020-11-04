<template>
  <v-lazy
    v-model="isActive"
    :options="{
          threshold: .75
    }"
    min-height="200"
    transition="fade-transition"
  >
    <v-card
      class="mx-auto px-auto"
      max-width="450"
      outlined
    >
      <v-img
        class="white--text"
        max-height="400"
        height="100%"
        :src="book.imageUrl"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-card-title>{{ book.title }}</v-card-title>
      <v-card-subtitle>
        {{ findAuthorNameById(book.authorId) }}
      </v-card-subtitle>
      <v-card-text>
        Genres:
        <v-chip
          v-for="genre in book.genres"
          :key="genre"
          class="mx-1"
        >
          {{ genre }}
        </v-chip>
      </v-card-text>
      <v-card-actions v-show="showReviews">
        <v-btn
          text
        >
          Show Details
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="handleClick"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-if="show">
          <v-divider></v-divider>
          <BookRating :book.sync="book"></BookRating>
        </div>
      </v-expand-transition>
    </v-card>
  </v-lazy>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from 'vue';
import BookRating from '@/components/books/BookRating.vue';
import {mapGetters} from "vuex";
import {AuthorGetters} from "@/store/author.state";
import {ReviewActions, ReviewGetters} from "@/store/reviews.state";

export default Vue.extend({
  name: "BookDetail",
  props: {
    book: {
      id: Number,
      imageUrl: String,
      title: String,
      genres: Array,
      authorId: Number
    },
    showReviews: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
  },
  data() {
    return {
      show: false,
      isActive: false
    }
  },
  computed: {
    ...mapGetters({
      'findAuthorNameById': AuthorGetters.FIND_NAME_BY_ID,
      'isFetching': ReviewGetters.IS_FETCHING_REVIEW
    })
  },
  components: {
    BookRating
  },
  methods: {
    handleClick(): void {
      this.show = !this.show;
      if (this.show) {
        this.$store.dispatch(ReviewActions.FETCH_REVIEWS_FOR_BOOK, this.book);
      }
    },
  },
})
</script>

<style>

</style>
