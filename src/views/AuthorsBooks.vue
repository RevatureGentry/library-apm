<template>
  <v-container>
    <h1>Known books for {{ name(author(authorId)) }}</h1>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        v-for="book in booksByAuthor(authorId)"
        :key="book.id"
        align-self="stretch"
        sm="12"
        md="4"
        lg="3"
        xl="2"
      >
        <BookDetail
          :book="book"
        ></BookDetail>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import BookDetail from '@/components/books/BookDetail.vue';
import {mapGetters} from "vuex";
import {AuthorGetters} from "@/store/author.state";
// eslint-disable-next-line no-unused-vars
import {Author} from "@/types/library";

export default Vue.extend({
  name: "AuthorsBooks",
  props: {
    authorId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      'author': AuthorGetters.FIND_BY_ID,
      'booksByAuthor': AuthorGetters.FIND_BOOKS_BY_AUTHOR_ID,
    })
  },
  methods: {
    name(author: Author): string {
      return `${author.firstName} ${author.lastName}`
    }
  },
  components: {
    BookDetail
  }
})
</script>

<style>

</style>
