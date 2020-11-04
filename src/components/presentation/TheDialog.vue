<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="8"
    >
      <v-dialog
        v-model="show"
        max-width="450px"
        width="100%"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-tooltip
            bottom
            v-bind="attrs"
            v-on="on"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click.prevent="showDialog"
                :color="tooltipColor"
                fab
                dark
                x-small
                absolute
                bottom
                right
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span v-html="tooltipMessage"></span>
          </v-tooltip>
        </template>
        <v-card
          max-width="448px"
        >
          <v-card-title v-html="tooltipMessage"></v-card-title>
          <v-card-text>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-textarea
                v-model="content"
                label="What are your thoughts?"
                outlined
                full-width
                counter
                :error-messages="errors"
                :error-count="errors.length"
              >
              </v-textarea>
            </ValidationProvider>
          </v-card-text>
          <v-card-actions>
            <v-row
              align="center"
              justify="center"
              class="w-80"
            >
              <v-col
                cols="5"
              >
                <v-btn
                  type="submit"
                  block
                  color="green"
                  @click.prevent="handleSubmission"
                >
                  Submit
                </v-btn>
              </v-col>
              <v-col
                cols="5"
              >
                <v-btn
                  type="reset"
                  block
                  outlined
                  color="red"
                  @click.prevent="handleCancel"
                >
                  Close
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import {extend, setInteractionMode, ValidationProvider} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';
// eslint-disable-next-line no-unused-vars
import {CommentForm} from "@/types/forms";
import {ReviewActions} from "@/store/reviews.state";
import {mapGetters} from "vuex";
import {AuthorGetters} from "@/store/author.state";

setInteractionMode('lazy');

extend('required', {
  ...required,
  message: '{_field_} is required'
});

export default Vue.extend({
  name: "TheDialog",
  props: {
    tooltipMessage: {
      type: String,
      required: true
    },
    tooltipColor: {
      type: String,
      required: true
    },
    reviewId: {
      type: Number,
      required: true
    },
    parentCommentId: {
      type: Number,
      default: -1
    },
    bookId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      content: '',
      show: false
    }
  },
  components: {
    ValidationProvider
  },
  computed: {
    ...mapGetters({
      'book': AuthorGetters.FIND_BOOK_BY_ID
    })
  },
  methods: {
    handleSubmission() {
      const comment: CommentForm = {
        reviewId: this.reviewId,
        content: this.content
      }
      if (this.parentCommentId > 0) {
        comment.parentCommentId = this.parentCommentId;
      }
      const targetBook = this.book(this.bookId);
      this.$store.dispatch(ReviewActions.SUBMIT_COMMENT, { form: comment, book: targetBook });
      this.content = '';
      this.show = false;
    },
    handleCancel() {
      this.content = '';
      this.show = false;
    },
    showDialog() {
      this.show = true;
    }
  }
})
</script>

<style scoped>

.w-80 {
  max-width: 449px;
  width: 100%;
}

</style>
