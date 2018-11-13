<template>
  <div>
    <h1 v-if="user">
      {{ user.username }}'s profile
    </h1>
    <div>
      <PhotoPicker :user="user" />
      <ProfileForm v-if="user" :user="user" :fields="fields" />
    </div>
  </div>
</template>

<script>
// import { Auth, Storage, Logger } from 'aws-amplify'
import AmplifyStore from '../../store'
import ProfileForm from './ProfileForm'
import PhotoPicker from './PhotoPicker'

export default {
  name: 'Profile',
  components: {
    ProfileForm,
    PhotoPicker,
  },
  data: () => {
    return {
      profilePic: false,
      imagePath: `${AmplifyStore.state.user.username}/avatar`,
      photoPickerConfig: {
        header: 'Upload Profile Pic',
        accept: 'image/*',
        path: `${AmplifyStore.state.user.username}/`,
        defaultName: 'avatar',
      },
      mfa: false,
      fields: [
        { type: 'string', name: 'email', label: 'Email' },
        { type: 'string', name: 'phone_number', label: 'Phone Number' },
      ],
    }
  },
  computed: {
    mfaConfig: function() {
      let that = this
      return {
        mfaDescription: "My app's mfa description!!",
        mfaTypes: ['TOTP', 'SMS', 'None'],
        cancelHandler: function() {
          that.toggleAccordion('mfa')
        },
      }
    },
    user: function() {
      return AmplifyStore.state.user
    },
    profilePicAccordion: function() {
      return {
        'is-closed': !this.profilePic,
        'is-primary': this.profilePic,
        'is-dark': !this.profilePic,
      }
    },
    mfaAccordion: function() {
      return {
        'is-closed': !this.mfa,
        'is-primary': this.mfa,
        'is-dark': !this.mfa,
      }
    },
  },
  methods: {
    toggleAccordion: function(el) {
      this[el] = !this[el]
    },
  },
}
</script>

<!--
  <template>
      <div>
      <div v-if="user">{{user.username}}</div>

      <PhotoPicker
      :defSrc="'/static/avatar.png'"
        :path="'avatars/' + userId"
        :theme="theme"
        v-if="userId" />
     <photopicker
        :defSrc="'/static/avatar.png'"
        :path="'avatars/' + userId"
        :theme="theme"
        v-if="userId"
      />

      <SimpleForm
        :path="'profiles/' + userId"
        :fields="fields"
        :theme="theme"
        v-if="userId"
      />
    <a-simple-form
        :path="'profiles/' + userId"
        :fields="fields"
        :theme="theme"
        v-if="userId"
      />
    </div>
  },
    data () {
      return {
        fields: [
          { type: 'string', name: 'firstName', label: 'FirstName' },
          { type: 'string', name: 'lastName', label: 'LastName' },
          { type: 'lineBreak' },
          { type: 'string', name: 'nickname', label: 'Nickname' }
        ],
        theme: AmplifyTheme
      }
    },
    computed: {
      user: function() { return AmplifyStore.state.user },
      userId: function() { return AmplifyStore.state.userId }
    }
  }
  </script>

  </template>
  },
    data () {
      return {
        fields: [
          { type: 'string', name: 'firstName', label: 'FirstName' },
          { type: 'string', name: 'lastName', label: 'LastName' },
          { type: 'lineBreak' },
          { type: 'string', name: 'nickname', label: 'Nickname' }
        ],
        theme: AmplifyTheme
      }
    },
    computed: {
      user: function() { return AmplifyStore.state.user },
      userId: function() { return AmplifyStore.state.userId }
    }
  }
  </script>


  },
    data () {
      return {
        fields: [
          { type: 'string', name: 'firstName', label: 'FirstName' },
          { type: 'string', name: 'lastName', label: 'LastName' },
          { type: 'lineBreak' },
          { type: 'string', name: 'nickname', label: 'Nickname' }
        ],
        theme: AmplifyTheme
      }
    },
    computed: {
      user: function() { return AmplifyStore.state.user },
      userId: function() { return AmplifyStore.state.userId }
    }
  }
  </script>

  <script>
  },
    data () {
      return {
        fields: [
          { type: 'string', name: 'firstName', label: 'FirstName' },
          { type: 'string', name: 'lastName', label: 'LastName' },
          { type: 'lineBreak' },
          { type: 'string', name: 'nickname', label: 'Nickname' }
        ],
        theme: AmplifyTheme
      }
    },
    computed: {
      user: function() { return AmplifyStore.state.user },
      userId: function() { return AmplifyStore.state.userId }
    }
  }
  </script>

  import { Auth, S
  },
    data () {
      return {
        fields: [
          { type: 'string', name: 'firstName', label: 'FirstName' },
          { type: 'string', name: 'lastName', label: 'LastName' },
          { type: 'lineBreak' },
          { type: 'string', name: 'nickname', label: 'Nickname' }
        ],
        theme: AmplifyTheme
      }
    },
    computed: {
      user: function() { return AmplifyStore.state.user },
      userId: function() { return AmplifyStore.state.userId }
    }
  }
  </script>
  torage, Logger } from 'aws-amplify'
  import AmplifyTh
  },
    data () {
      return {
        fields: [
          { type: 'string', name: 'firstName', label: 'FirstName' },
          { type: 'string', name: 'lastName', label: 'LastName' },
          { type: 'lineBreak' },
          { type: 'string', name: 'nickname', label: 'Nickname' }
        ],
        theme: AmplifyTheme
      }
    },
    computed: {
      user: function() { return AmplifyStore.state.user },
      userId: function() { return AmplifyStore.state.userId }
    }
  }
  </script>
  eme from '../../theme/AmplifyTheme.js'
  import AmplifySt
  },
    data () {
      return {
        fields: [
          { type: 'string', name: 'firstName', label: 'FirstName' },
          { type: 'string', name: 'lastName', label: 'LastName' },
          { type: 'lineBreak' },
          { type: 'string', name: 'nickname', label: 'Nickname' }
        ],
        theme: AmplifyTheme
      }
    },
    computed: {
      user: function() { return AmplifyStore.state.user },
      userId: function() { return AmplifyStore.state.userId }
    }
  }
  </script>
  ore from '../../store';
  import PhotoPicker from './PhotoPicker';
  import SimpleForm from './SimpleForm';

  const logger = new Logger('Profile');
  export default {
    name: 'Profile',
    components:{
      PhotoPicker,
    SimpleForm
  },
    data () {
      return {
        fields: [
          { type: 'string', name: 'firstName', label: 'FirstName' },
          { type: 'string', name: 'lastName', label: 'LastName' },
          { type: 'lineBreak' },
          { type: 'string', name: 'nickname', label: 'Nickname' }
        ],
        theme: AmplifyTheme
      }
    },
    computed: {
      user: function() { return AmplifyStore.state.user },
      userId: function() { return AmplifyStore.state.userId }
    }
  }
  </script>
-->
