<template>
  <v-container
    fluid
    v-if="!isFetching"
  >
    <v-row
      align="center"
      justify="center"
    >
      ({{ reviews(book.id).length }})
        <v-rating
          half-increments
          readonly
          length="5"
          :value="findAverageRating(reviews(book.id))"
        ></v-rating>
    </v-row>
    <v-row
      align="center"
      justify="center"
      class="py-2"
      v-show="showButton"
    >
      <v-btn
        block
        width="80%"
        class="my-1"
        :to="{ path: `/books/${book.id}/review` }"
      >
        Add Your Review!
      </v-btn>
      <v-btn
        block
        width="80%"
        class="my-1"
        :to="{ path: `/books/${book.id}/reviews` }"
      >
        See all Reviews
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from 'vue';
import {mapGetters} from "vuex";
import {ReviewGetters} from "@/store/reviews.state";
// eslint-disable-next-line no-unused-vars
import {Review} from "@/types/library";

export default Vue.extend({
  name: "BookRating",
  props: {
    book: {
      id: Number,
      imageUrl: String,
      title: String,
      genres: Array,
      authorId: Number
    },
    showButton: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    ...mapGetters({
      'reviews': ReviewGetters.FIND_BY_BOOK,
      'isFetching': ReviewGetters.IS_FETCHING_REVIEW
    }),
  },
  methods: {
    findAverageRating(reviews: Review[]): number {
      if (Array.isArray(reviews) && reviews.length) {
        return reviews.map(review => review.rating).filter(rating => rating ?? 0).reduce((acc, curr) => acc + curr, 0) / reviews.length as number;
      }
      return 0;
    },
  }
})
</script>

<style>

</style>
