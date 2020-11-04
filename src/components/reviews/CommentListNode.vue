<template>
  <v-container>
    <v-row
      :class="`ml-${2 * depth}`"
      align="center"
      justify="start"
    >
      <v-alert
        border="left"
        text
        color="info"
        class="text--white"
      >
        <h2 class="mb-4">{{ comment.comment }}</h2>

        <small>- {{ comment.commenter }}</small><br>
        <small>{{ getTimestamp(comment) }}</small>
        <TheDialog
          :review-id="reviewId"
          tooltip-color="orange"
          :parent-comment-id="comment.id"
          :tooltip-message="getCommentPreview(comment)"
          :book-id="bookId"
        ></TheDialog>
      </v-alert>
      <CommentListNode
        v-for="child in comment.comments"
        :key="child.id"
        :comment.sync="child"
        :review-id="reviewId"
        :depth="depth + 1"
        :book-id="bookId"
      ></CommentListNode>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import TheDialog from '@/components/presentation/TheDialog.vue';
// eslint-disable-next-line no-unused-vars
import { Comment } from "@/types/library";

export default Vue.extend({
  name: "CommentListNode",
  props: {
    comment: {
      type: Object,
      required: true
    },
    depth: {
      type: Number,
      required: true,
      default: 0
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
  methods: {
    getTimestamp(comment: Comment): string | undefined {
      if (comment.lastModified) {
        return `Altered ${comment.lastModified}`
      }
      return `Created ${comment.createdOn}`;
    },
    getCommentPreview(comment: Comment): string {
      return `Reply to '<em>${comment.comment.substring(0, 20)}...</em>'`
    }
  },
  components: {
    TheDialog
  }
})
</script>

<style>

</style>
