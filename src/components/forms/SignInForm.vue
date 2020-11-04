<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        md="8"
        sm="10"
        lg="7"
        xl="6"
      >
        <v-form
          novalidate
          v-model="valid"
        >
          <v-card>
            <v-card-title>Sign In</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="email"
                type="email"
                full-width
                label="Email"
                :rules="emailRules"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                full-width
                label="Password"
                :rules="passwordRules"
                outlined
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-btn
                    block
                    rounded
                    type="button"
                    @click.prevent="handleSubmission"
                    color="primary"
                    class="my-2"
                  >
                    Submit
                  </v-btn>
                  <v-btn
                    block
                    rounded
                    type="button"
                    @click.prevent="handleRegistration"
                    color="secondary"
                    class="my-2"
                  >
                    Register Now
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
            <v-alert
              dense
              outlined
              v-if="authErrorMessage.message !== ''"
              :type="authErrorMessage.type"
            >
              {{ authErrorMessage.message }}
            </v-alert>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {regex} from "@/types/auth";
// eslint-disable-next-line no-unused-vars
import {EmailPasswordForm} from "@/types/forms";
import {AuthActions, AuthGetters} from "@/store/auth.state";
import {mapGetters} from "vuex";
import {UiActions, UiGetters} from "@/store/ui.state";

export default Vue.extend({
  name: "SignInForm",
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        (email: string): boolean | string => !!email || 'Required Value',
        (email: string): boolean | string => email && regex.email.test(email) || 'Invalid Pattern'
      ],
      password: '',
      passwordRules: [
        (password: string): boolean | string => !!password || 'Required Value'
      ]
    }
  },
  methods: {
    handleSubmission(): void {
      const form: EmailPasswordForm = { email: this.email, password: this.password };
      this.$store.dispatch(UiActions.CLEAR_ALL_MESSAGES).then(async () => {
        return await this.$store.dispatch(AuthActions.ATTEMPT_FORM_AUTHENTICATION, { form });
      });
    },
    handleRegistration(): void {
      const form: EmailPasswordForm = { email: this.email, password: this.password };
      this.$store.dispatch(UiActions.CLEAR_ALL_MESSAGES).then(() => {
        this.$store.dispatch(AuthActions.ATTEMPT_REGISTRATION, { form });
      });
    }
  },
  computed: {
    ...mapGetters({
      'authErrorMessage': UiGetters.AUTH_ERROR_MESSAGE,
      'isAuthenticated': AuthGetters.IS_AUTHENTICATED
    })
  }
})
</script>

<style>

</style>
