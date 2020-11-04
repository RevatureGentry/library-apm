<template>
  <v-container
    fluid
  >
    <CommentListNode
      v-for="comment in comments"
      :key="comment.id"
      :depth="0"
      :comment.sync="comment"
      :review-id="reviewId"
      :book-id="bookId"
    ></CommentListNode>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import CommentListNode from '@/components/reviews/CommentListNode.vue';

export default Vue.extend({
  name: "CommentsList",
  props: {
    comments: {
      type: Array,
      required: true
    },
    reviewId: {
      type: Number,
      required: true
    },
    bookId: {
      type: Number,
      required: true
    }
  },
  components: {
    CommentListNode
  }
})
</script>

<style>

</style>
