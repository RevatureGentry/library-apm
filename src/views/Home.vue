<template>
  <v-container>
    <v-row
      align="center"
      v-if="isAuthenticated"
    >
      <v-alert
        text
        prominent
        color="teal"
        icon="mdi-human-greeting"
      >
        <h3>Welcome, {{ user.email }}!</h3>
      </v-alert>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from "vuex";
import {AuthGetters} from "@/store/auth.state";

export default Vue.extend({
  name: "Home",
  computed: {
    ...mapGetters({
      'user': AuthGetters.CURRENT_USER,
      'isAuthenticated': AuthGetters.IS_AUTHENTICATED
    })
  },
})
</script>

<style>

</style>
