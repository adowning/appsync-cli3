<template>
  <div class="form">
    <div v-for="field in fields" :key="field.name" class="inputRow">
      <div v-if="field.type === 'string'">
        <label class="inputLabel">
          {{ field.label || field.name }}
        </label>
        <input v-model="user[field.name]" class="input" />
      </div>
      <div v-if="field.type === 'lineBreak'" class="lineBreak" />
    </div>
    <div class="actionRow">
      <button class="action" @click="save">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import store from '../../store'
export default {
  name: 'ProfileForm',
  props: {
    fields: {
      default: null,
      type: Array,
    },
  },
  data() {
    return {
      user: {},
    }
  },
  async mounted() {
    if (store.state.user) {
      const currentUser = await this.$Amplify.Auth.currentUserInfo()
      console.log(currentUser.attributes)
      this.user = {
        preferred_username: currentUser.username,
        ...currentUser.attributes,
      }
    }
  },
  methods: {
    save() {
      const cognitoUser = store.state.user
      if (!this.user || !cognitoUser) {
        return
      }
      this.$Amplify.Auth.updateUserAttributes(cognitoUser, this.user)
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    },
  },
}
</script>

<!--
  <template>
    <div :style="style.form">
      <div :style="style.inputRow" v-for="field in fields">
        <div v-if="field.type === 'string'">
          <label :style="style.inputLabel">{{field.label || field.name}}</label>
          <input
            :style="style.input"
            v-model="profile[field.name]"
            v-bind:placeholder="field.label || field.name"
          />
        </div>
        <div :style="style.lineBreak" v-if="field.type === 'lineBreak'"></div>
      </div>
      <div :style="style.actionRow">
        <button :style="style.action" v-on:click="save">Save</button>
      </div>
    </div>
  </template>

  <script>
  import { Auth, Storage, Logger } from 'aws-amplify'
  import AmplifyTheme from '../../theme/AmplifyTheme'
  const logger = new Logger('SimpleForm');
  export default {
    name: 'SimpleForm',
    data () {
      return {
        profile: {},
        style: this.theme || AmplifyTheme
      }
    },
    props: ['path', 'fields', 'theme'],
    computed: {
      userId: function() { return this.$store.state.userId }
    },
    created() {
      logger.info('created...')
      this.load()
    },
    methods: {
      load() {
        //const profileKey = 'profiles/' + this.userId
        Storage.get(this.path, { download: true })
          .then(data => {
            const body = data.Body.toString('utf8')
            this.profile = JSON.parse(body)
          })
          .catch(err => logger.error(err))
      },
      save() {
        if (!this.userId) { return }
        const data = JSON.stringify(this.profile)
        Storage.put(this.path, data, { contentType: 'application/json' })
          .then(data => logger.debug(data))
          .catch(err => logger.error(err))
      }
    }
  }
  </script>
-->
