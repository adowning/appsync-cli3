<template>
  <form class="CreateEnvironmentPage login" @submit.prevent="createEnvironment">
    <div class="container">
      <div class="row">
        <div class="col card wrapper s12 offset-s0 m10 offset-m2 l8 offset-l3">
          <h2 class="center-align logo">
            <!--
              <img src="../../../assets/logo.svg" alt="Welcome to the Kuzzle Admin Console" style="width: 70%" />
            -->
            <img
              src="../../../assets/andrews_spelledout.svg"
              alt="Andrews Group"
              style="width: 30%"
            />
          </h2>
          <div class="row message-warning">
            <h5>Register Device</h5>
            <div class="divider"></div>
            <p class="message">
              Please enter the device ID found on the back of the tablet.
            </p>
          </div>

          <create-environment
            :environment-id="null"
            ref="createEnvironmentComponent"
          >
          </create-environment>

          <div class="row">
            <div class="col s4 right">
              <button
                type="submit"
                class="CreateEnvironmentPage-createBtn Environment-SubmitButton waves-effect btn"
              >
                Register device
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import CreateEnvironment from "./CreateEnvironment";

export default {
  name: "CreateEnvironmentPage",
  components: {
    CreateEnvironment
  },
  methods: {
    createEnvironment() {
      try {
        this.$refs.createEnvironmentComponent
          .createEnvironment()
          .then(() => this.$router.push({ name: "Home" }))
          .catch(e => console.error(e));
      } catch (e) {}
    }
  }
};
</script>
