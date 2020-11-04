<template>
  <v-tabs
    v-model="currentTab"
    centered
    align-with-title
  >
    <v-tab
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
    >
      {{ tab.display }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import Vue from 'vue';
import { sideMenuTabs } from "@/types/presentation";

export default Vue.extend({
  name: "TheNavbarTabs",
  data() {
    return {
      tabs: sideMenuTabs,
      currentTab: null
    }
  }
})
</script>

<style>

</style>
