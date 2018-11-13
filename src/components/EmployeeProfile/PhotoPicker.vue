<template>
  <div class="text-center">
    <img v-if="userAvatar" :src="userAvatar" />
    <img :src="src" :style="pickerStyle.img" @error="imageError" />
    <!-- <amplify-s3-image :imagePath="path"></amplify-s3-image> -->
    <!-- <button id="pick-avatar">Edit</button> -->
    <VFlex>
      <VBtn id="pick-avatar" ref="pick-avatar" dark blue color="primary">
        Edit
      </VBtn>
    </VFlex>
    <AvatarCropper
      :labels="{ submit: 'submit', cancel: 'cancel' }"
      trigger="#pick-avatar"
      upload-url="/files/upload"
      @uploaded="handleUploaded"
      @uploading="handleUploading"
      @uploadHandler="handleUploading"
    />
  </div>
</template>

<script>
import AvatarCropper from 'vue-avatar-cropper'
import { Storage, Logger } from 'aws-amplify'
import AmplifyTheme from '../../theme/AmplifyTheme.js'

const logger = new Logger('PhotoPicker')
const pickerStyle = {
  picker: {
    position: 'relative',
  },
  preview: {
    maxWidth: '100%',
  },
  img: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    fontSize: '1.2em',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    display: 'inline-block',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0,
    cursor: 'pointer',
  },
}
export default {
  components: { AvatarCropper },
  data() {
    return {
      userAvatar: undefined,
      path: `${this.$store.state.user.username}/avatar`,
      src: this.defSrc,
      style: this.theme || AmplifyTheme,
    }
  },
  computed: {
    pickerStyle() {
      return Object.assign({}, this.style.picker, pickerStyle)
    },
  },
  created: function() {
    this.getPhoto()
  },
  methods: {
    imageError: function(/*err */) {
      this.src = this.defSrc
    },
    getPhoto: function() {
      Storage.get(this.path).then(url => (this.src = url))
    },
    handleUploading(form /*xhr*/) {
      // form.append('foo', 'bar')
      const file = form.values().next().value

      //   const file = form.values()[0];
      const { name, size, type } = file
      logger.debug(file)
      logger.debug(name)
      logger.debug(size)
      logger.debug('upload photo to ' + this.path)
      Storage.put(this.path, file, { contentType: type })
        .then(data => {
          logger.debug(data)
          this.getPhoto()
        })
        .catch(err => logger.error(err))

        // console.log(xhr)
        //             const file = e.target.files[0];
        // const { name, size, type } = file;
        //           Storage.put(this.path, file, { contentType: type })
        //   .then(data => {
        //     logger.debug(data)
        //     this.getPhoto()
        //   })
        //   .catch(err => logger.error(err));
    },

    handleUploaded(response /*form */) {
      this.userAvatar = response.relative_url
      // update user avatar attribute
    },
    handleCompleted(/*response, form*/) {
      // xhr.status
    },
    handlerError(message, type) {
      console.log(message)
      if (type == 'upload') {
        console.log(message)
      }
    },
  },
}
</script>
<style>
.btn {
  color: #2196f3;
}
.v-btn {
  color: #2196f3;
}
</style>
