<template>
  <v-lazy
    v-model="isActive"
    :options="{
          threshold: .95
    }"
    min-height="200"
    transition="fade-transition"
  >
    <v-card
      class="mx-auto"
      max-width="400"
      outlined
    >
      <v-img
        :src="author.imageUrl"
        class="white--text"
        max-height="400"
        height="100%"
      >
        <v-card-title>{{ author.firstName }} {{ author.lastName }}</v-card-title>
      </v-img>
      <v-card-text>
        <div v-if="author.books && author.books.length">
          Famous for
          <v-chip
            v-for="genre in findGenres(author.books)"
            :key="genre"
            class="mx-1"
          >
            {{ genre }}
          </v-chip>
          <v-btn
            block
            :color="getRandomColor()"
            :to="{ path: `/authors/${author.id}/books` }"
            class="mt-4"
          >
            See all books from {{ author.firstName }} {{ author.lastName }}
          </v-btn>
        </div>
        <div v-else>
          No books known for {{ author.firstName }} {{ author.lastName }}!
        </div>
      </v-card-text>
    </v-card>
  </v-lazy>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from 'vue';
// eslint-disable-next-line no-unused-vars
import {Book} from "@/types/library";

const colors = ['red', 'orange', 'green', 'purple', 'blue', 'teal', 'blue-grey']

export default Vue.extend({
  name: "AuthorDetail",
  props: {
    author: {
      id: Number,
      firstName: String,
      lastName: String,
      imageUrl: String,
      books: Array
    }
  },
  methods: {
    findGenres(books: Book[]): string[] {
      return Array.from(new Set(books.filter(book => Array.isArray(book.genres)).flatMap(book => book.genres)));
    },
    getRandomColor(): string {
      const index = Math.floor(Math.random() * colors.length);
      return colors[index];
    }
  },
  data() {
    return {
      colors,
      isActive: false
    }
  },
})
</script>

<style>

</style>
