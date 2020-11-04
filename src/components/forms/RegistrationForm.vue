<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <v-col>
        <v-form
          novalidate
          v-model="valid"
        >
          <v-card>
            <v-card-title>Registration</v-card-title>
            <v-card-subtitle>Already Registered?</v-card-subtitle>
            <v-card-text>

            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "RegistrationForm",
  data() {
    return {
      valid: false
    }
  }
})
</script>

<style>

</style>
