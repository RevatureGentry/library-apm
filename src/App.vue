<template>
  <v-app>
    <TheNavbar></TheNavbar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TheNavbar from '@/components/presentation/TheNavbar.vue';

export default Vue.extend({
  name: 'App',
  components: {
    TheNavbar
  }
})

</script>
