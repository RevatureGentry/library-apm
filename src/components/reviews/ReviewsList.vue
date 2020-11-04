<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        align-self="stretch"
      >
        <v-card

        >
          <v-card-title>Reviews</v-card-title>
          <v-card-text>
            <v-list
              two-line
            >
              <v-list-group
                v-for="review in reviews(bookId)"
                :key="review.id"
                :active="review.id === active"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="review.reviewer"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="getSubtitleText(review)"
                    >
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
                <v-list-item>
                  <v-list-item-content>
                    <v-alert
                      border="left"
                      text
                      color="success"
                      class="text--white"
                    >
                      <h2 class="mb-4">{{ review.content }}</h2>
                      <v-rating
                        half-increments
                        readonly
                        length="5"
                        :value="review.rating"
                        append="mdi-comment-account-outline"
                      >
                      </v-rating>
                      <TheDialog
                        :review-id="review.id"
                        tooltip-color="light-blue"
                        :tooltip-message="getReviewPreview(review)"
                        :book-id="bookId"
                      ></TheDialog>
                    </v-alert>
                    <CommentsList
                      :comments.sync="review.comments"
                      :review-id="review.id"
                      :book-id="bookId"
                    >
                    </CommentsList>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card-text>
          <v-card-actions>
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
                  color="green"
                  outlined
                  :to="{ path: `/books/${bookId}/review` }"
                >
                  Add your own Review
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import CommentsList from '@/components/reviews/CommentsList.vue';
import TheDialog from '@/components/presentation/TheDialog.vue';
import {mapGetters} from "vuex";
import {ReviewGetters} from "@/store/reviews.state";
// eslint-disable-next-line no-unused-vars
import {Review} from "@/types/library";
import {AuthorGetters} from "@/store/author.state";

export default Vue.extend({
  name: "ReviewsList",
  props: {
    bookId: Number,
  },
  data() {
    return {
      active: -1
    }
  },
  computed: {
    ...mapGetters({
      'reviews': ReviewGetters.FIND_BY_BOOK,
      'book': AuthorGetters.FIND_BOOK_BY_ID,
    })
  },
  methods: {
    getSubtitleText(review: Review): string | undefined {
      if (review.lastModified) {
        return review.lastModified;
      }
      return review.createdOn;
    },
    getReviewPreview(review: Review): string {
      if (review && review.content) {
        return `Reply to '<em>${review.content.substring(0, 20)}...</em>'`
      }
      return '';
    },

  },
  components: {
    CommentsList,
    TheDialog
  }
})
</script>

<style>

</style>
