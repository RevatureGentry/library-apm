<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        align-self="stretch"
        cols="5"
      >
        <BookDetail :book="book(bookId)" :show-reviews="showReviews"></BookDetail>
      </v-col>
      <v-col
        align-self="stretch"
        cols="7"
      >
        <ReviewForm :book-id="bookId"></ReviewForm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import BookDetail from '@/components/books/BookDetail.vue';
import ReviewForm from '@/components/forms/ReviewForm.vue';
import {mapGetters} from "vuex";
import {AuthorGetters} from "@/store/author.state";

export default Vue.extend({
  name: "CreateReview",
  props: {
    bookId: Number,
    showReviews: Boolean
  },
  components: {
    BookDetail,
    ReviewForm
  },
  computed: {
    ...mapGetters({
      'book': AuthorGetters.FIND_BOOK_BY_ID
    })
  }
})
</script>

<style>

</style>
