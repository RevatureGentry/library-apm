<template>
  <v-container>
    <v-row
      align="center"
    >
      <v-col
        v-for="author in authors"
        :key="author.id"
        align-self="stretch"
        sm="12"
        md="6"
        lg="4"
        xl="3"
      >
        <AuthorDetail :author="author"></AuthorDetail>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthorDetail from '@/components/author/AuthorDetail.vue';
import {AuthorActions, AuthorGetters} from "@/store/author.state";
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "Authors",
  mounted() {
    this.$store.dispatch(AuthorActions.FETCH_ALL);
  },
  computed: {
    ...mapGetters({
      'authors': AuthorGetters.FIND_ALL,
    })
  },
  components: {
    AuthorDetail
  }
})
</script>

<style>

</style>
