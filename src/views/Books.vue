<template>
  <v-container
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        v-for="book in books"
        :key="book.id"
        align-self="stretch"
        sm="12"
        md="4"
        lg="3"
        xl="2"
      >
        <BookDetail :book="book"></BookDetail>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from "vuex";
import {AuthorActions, AuthorGetters} from "@/store/author.state";
import BookDetail from '@/components/books/BookDetail.vue';

export default Vue.extend({
  name: "Books.vue",
  mounted() {
    this.$store.dispatch(AuthorActions.FETCH_ALL);
  },
  computed: {
    ...mapGetters({
      'books': AuthorGetters.FIND_ALL_BOOKS,
    })
  },
  components: {
    BookDetail
  }
})
</script>

<style>

</style>
