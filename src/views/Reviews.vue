<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        align-self="stretch"
        sm="12"
        md="5"
        lg="5"
        xl="5"
        order-sm="1"
      >
        <BookDetail :book="book(bookId)" :show-reviews="showReviews"></BookDetail>
      </v-col>
      <v-col
        align-self="stretch"
        sm="12"
        md="7"
        lg="7"
        xl="7"
        order-sm="2"
      >
        <router-view/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import BookDetail from '@/components/books/BookDetail.vue';
import {mapGetters} from "vuex";
import {AuthorGetters} from "@/store/author.state";

export default Vue.extend({
  name: "Reviews",
  props: {
    bookId: Number,
    showReviews: Boolean
  },
  components: {
    BookDetail,
  },
  computed: {
    ...mapGetters({
      'book': AuthorGetters.FIND_BOOK_BY_ID,
    })
  },
})
</script>

<style>

</style>
