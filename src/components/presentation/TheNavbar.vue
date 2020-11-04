<template>
  <v-container>
    <v-app-bar
      app
    >
      <v-toolbar-title>
        <router-link
          :to="{ path: determineRoute(isAuthenticated) }"
          tag="span"
          class="link"
        >
          <v-row
            justify="space-between"
            align="center"
            class="mx-4"
          >
            Library APM Demo
          </v-row>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        type="button"
        color="green"
        v-if="isAuthenticated"
        @click.prevent="signOut"
      >
        Sign Out
      </v-btn>
      <template v-slot:extension v-if="isAuthenticated">
        <TheNavbarTabs></TheNavbarTabs>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import TheNavbarTabs from '@/components/presentation/TheNavbarTabs.vue';
import { mapGetters } from "vuex";
import {AuthActions, AuthGetters} from "@/store/auth.state";
import {signOutUser} from "@/plugins/firebase";

export default Vue.extend({
  name: "TheNavbar",
  components: {
    TheNavbarTabs
  },
  computed: {
    ...mapGetters({
      'isAuthenticated': AuthGetters.IS_AUTHENTICATED
    })
  },
  data() {
    return {
      sideMenuOpen: false
    }
  },
  methods: {
    determineRoute(isAuthenticated: boolean): string {
      return isAuthenticated ? '/home' : '/'
    },
    signOut() {
      signOutUser().then(() => {
        return this.$store.dispatch(AuthActions.SIGN_OUT).then(() => {
          return this.$router.push({ path: '/', replace: true })
        });
      });
    }
  }
})
</script>

<style scoped>
.link {
  cursor: pointer;
}
</style>
