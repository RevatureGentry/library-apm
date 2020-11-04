<template>
  <v-list
    nav
  >
    <v-list-item
      v-for="tab in tabs"
      :key="tab.display"
      v-model="tab.active"
      :to="{ path: tab.to }"
    >
      <v-list-item-icon>
        <v-icon v-text="tab.icon"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="tab.display"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import { sideMenuTabs } from "@/types/presentation";

export default Vue.extend({
  name: "TheSideMenu",
  data() {
    return {
      tabs: sideMenuTabs
    }
  }
})
</script>

<style>

</style>
