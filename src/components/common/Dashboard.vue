<template>
  <div class="vld-parent">
    <div class="row ">
      <div class="fdc-right col-md-6" />
      <div class=" col-md-6">
        <label :for="cbId" class="form-check-label fdc-right">
          Show dollar amounts bellow
        </label>
        <input
          :id="cbId"
          v-model="showDollarAmount"
          type="checkbox"
          class="form-check-input fdc-right"
          checked
          @change="checkShowDollar()"
        />
      </div>
    </div>
    <div class="row">
      <div
        v-for="stats in statsCards"
        :key="stats.id"
        class="col-lg-4 col-md-6 col-sm-6"
      >
        <StatsCard
          :type="stats.type"
          :icon="stats.icon"
          :small-title="stats.title"
          :title="stats.value"
        >
          <div slot="footer" class="stats">
            <i :class="stats.footerIcon" /> {{ stats.footerText }}
          </div>
        </StatsCard>
      </div>
      <PButton type="success" @click="signIn">
        signin
      </PButton>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Auth } from 'aws-amplify'
// import StatsCard from 'src/components/UIComponents/Cards/StatsCard';
export default {
  components: {
    // StatsCard,
  },
 
 
  data() {
    return {
      showDollarAmount: false,
      statsCards: [
        {
          type: 'warning',
          icon: 'nc-icon nc-globe',
          title: 'Capacity',
          value: '105GB',
          footerText: 'Updated now',
          footerIcon: 'nc-icon nc-refresh-69',
        },
        {
          type: 'success',
          icon: 'nc-icon nc-money-coins',
          title: 'Revenue',
          value: '$1,345',
          footerText: 'Last day',
          footerIcon: 'nc-icon nc-calendar-60',
        },
        {
          type: 'danger',
          icon: 'nc-icon nc-vector',
          title: 'Errors',
          value: '23',
          footerText: 'In the last hour',
          footerIcon: 'nc-icon nc-bell-55',
        },
        {
          type: 'info',
          icon: 'nc-icon nc-favourite-28',
          title: 'Followers',
          value: '+45',
          footerText: 'Updated now',
          footerIcon: 'nc-icon nc-refresh-69',
        },
      ],
    }
  },
 
  async beforeCreate() {
    try {
      let account = await Auth.currentAuthenticatedUser()
      this.$store.commit('saveUser', account)
    } catch (err) {console.log(err)}
  },

  created() {
    this.setNavbarTitle('Dashboard')
  },
  methods: {
    ...mapActions('UI', ['setNavbarTitle']),

    checkShowDollar: function() {},
    signIn: function() {
      console.log('asdf')
      Auth.signIn('asdfx', 'asdfasdf')
        .then(data => {
          if (data.challengeName) {
            console.log('confirm1')
            this.$AmplifyEventBus.$emit('localUser', data)
            return this.$AmplifyEventBus.$emit('authState', 'confirmSignIn')
          }
          this.$router.push('/account/profile')
          return this.$AmplifyEventBus.$emit('authState', 'signedIn')
        })
        .catch(e => this.setError(e))
    },
  },
}
</script>
<style>
.fdc-right {
  float: right;
  position: relative;
  margin-bottom: 5px;
}
</style>
