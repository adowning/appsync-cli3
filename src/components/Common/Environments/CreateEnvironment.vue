<template>
    <div class="CreateEnvironment environment">
        <warning-header
            v-if="useHttps && !environment.ssl"
            :text="warningHeaderText"
        />

        <div class="row">
            <div class="col s12">
                <div class="input-field left-align">
                    <input
                        class="CreateEnvironment-name"
                        id="env-name"
                        type="text"
                        v-model="environment.deviceId"
                        v-focus
                        required
                        :class="{
                            invalid:
                                errors.deviceId ||
                                errors.environmentAlreadyExists,
                        }"
                    />
                    <label
                        for="env-name"
                        :class="{ active: environment.deviceId }"
                        data-error="Device ID is required"
                        >Device ID</label
                    >
                </div>
            </div>
        </div>

        <!--
            <div class="row">
              <div class="col s12">
                <div class="input-field left-align">
                  <input
                    class="CreateEnvironment-host"
                    id="host"
                    type="text"
                    v-model="environment.host"
                    required
                    :class="{ invalid: errors.host }"
                  />
                  <label
                    for="host"
                    :class="{ active: environment.host }"
                    data-error="The host must be something like 'mydomain.com'"
                    >Host</label
                  >
                </div>
              </div>
            </div>
        -->

        <!--
            <div class="row">
              <div class="col s6">
                <div class="input-field left-align">
                  <input
                    class="CreateEnvironment-port"
                    id="port"
                    type="number"
                    v-model="environment.port"
                    required
                    :class="{ invalid: errors.port }"
                  />
                  <label
                    for="port"
                    :class="{ active: environment.port }"
                    data-error="port number must be an integer"
                    >Port</label
                  >
                </div>
              </div>
              <div class="col s6">
                <div class="input-field left-align">
                  <input
                    class="CreateEnvironment-ssl"
                    id="ssl"
                    type="checkbox"
                    v-model="environment.ssl"
                  />
                  <label for="ssl">use SSL</label>
                </div>
              </div>
            </div>
        -->

        <div class="row"><div class="col s12"></div></div>

        <!--
            <div class="row color-picker">
              <div class="col s12">
                <div class="input-field left-align">
                  <p>Color</p>
                </div>
              </div>
              <div class="col s12">
                <div class="CreateEnvironment-colorBtns row">
                  <div class="col s6 m3" v-for="(color, index) in colors" :key="color">
                    <div class="color card valign-wrapper"
                         :style="{backgroundColor: color}"
                         @click="selectColor(index)">
                      <span class="selected valign center-align" v-if="environment.color === color">Selected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        -->
    </div>
</template>

<script>
import WarningHeader from '../WarningHeader'

import Focus from '../../../directives/focus.directive'
import { DEFAULT_COLOR } from '../../../services/environment'
import {
    // UPDATE_ENVIRONMENT,
    CREATE_ENVIRONMENT,
} from '../../../vuex/modules/common/kuzzle/mutation-types'

var useHttps = window.location.protocol === 'https:'
console.log(useHttps)

// useHttps = false

export default {
    name: 'CreateEnvironment',
    components: {
        WarningHeader,
    },
    props: ['environmentId'],
    directives: {
        Focus,
    },
    computed: {
        environments() {
            return this.$store.state.kuzzle.environments
        },
        useHttps() {
            return useHttps
        },
    },
    data() {
        return {
            errors: {
                name: false,
                host: false,
                environmentAlreadyExists: false,
            },
            environment: {
                name: 'andrews_dev',
                deviceId: null,
                host: 'api.groupandrews.com',
                port: 80,
                color: DEFAULT_COLOR,
                ssl: useHttps,
            },
            colors: [
                DEFAULT_COLOR,
                '#0277bd',
                '#8e24aa',
                '#689f38',
                '#f57c00',
                '#e53935',
                '#546e7a',
                '#d81b60',
            ],
            warningHeaderText:
                '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> You are using the HTTPS/SSL version of the Admin Console.<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> </br>Please ensure that your Kuzzle supports HTTPS/SSL connections.',
        }
    },
    methods: {
        getGuid() {
            var nav = window.navigator
            var screen = window.screen
            var guid = nav.mimeTypes.length
            guid += nav.userAgent.replace(/\D+/g, '')
            guid += nav.plugins.length
            guid += screen.height || ''
            guid += screen.width || ''
            guid += screen.pixelDepth || ''
            return guid
        },
        async createEnvironment() {
            console.log('jere')
            console.log($)
            var uagent = navigator.userAgent.split(' ')
            var deviceId = null
            this.errors.name = !this.environment.name
            if (uagent.includes('ANDROID_ID')) {
                deviceId = uagent.split('ANDROID_ID=')[1]
            } else {
                this.errors.deviceId = 'Unkown device Id'
                let ip = await $.getJSON(
                    'https://jsonip.com?callback=?',
                    function(data) {
                        return data.ip
                    }
                )
                let guid = this.getGuid()
                deviceId = guid + '-' + ip.ip
                console.log('deviceid ', deviceId)
            }
            console.log('deviceid ', deviceId)

            // this.errors.port = (!this.environment.port || typeof this.environment.port !== 'number')
            // Host is required and must be something like 'mydomain.com/toto'
            // this.errors.host = !this.environment.host || /^(http|ws):\/\//.test(this.environment.host);
            this.environment.host = 'api.groupandrews.com'
            this.environment.name = 'andrews_dev'
            let _host = this.environment.host.trim()
            let _name = this.environment.name.trim()

            if (!this.environmentId || this.environmentId !== _name) {
                this.errors.environmentAlreadyExists =
                    this.$store.state.kuzzle.environments[_name] !== undefined
            } else {
                this.errors.environmentAlreadyExists = false
            }

            if (
                this.errors.name ||
                this.errors.host ||
                this.errors.environmentAlreadyExists
            ) {
                throw new Error('Name or host invalid')
            }
            // if (this.environmentId) {
            //   return this.$store.dispatch(UPDATE_ENVIRONMENT, {
            //     id: this.environmentId,
            //     environment: {
            //       name: _name,
            //       color: this.environment.color,
            //       host: _host,
            //       port: this.environment.port,
            //       ssl: this.environment.ssl,
            //     },
            //   });
            // } else {
            return this.$store.dispatch(CREATE_ENVIRONMENT, {
                id: _name,
                environment: {
                    name: _name,
                    deviceId: this.environment.deviceId,
                    color: this.environment.color,
                    host: _host,
                    port: this.environment.port,
                    ssl: this.environment.ssl,
                },
            })
            // }
        },
        selectColor(index) {
            this.environment.color = this.colors[index]
        },
    },
    created() {
        if (this.environmentId && this.environments[this.environmentId]) {
            this.environment.name = this.environments[this.environmentId].name
            this.environment.deviceId = this.environments[
                this.environmentId
            ].deviceId
            this.environment.host = this.environments[this.environmentId].host
            this.environment.port = this.environments[this.environmentId].port
            this.environment.color = this.environments[this.environmentId].color
            this.environment.ssl = this.environments[this.environmentId].ssl
        } else {
            this.environment.name = 'andrews_dev'
            this.environment.host = 'api.groupandrews.com'
            this.environment.deviceId = null
            // this.environment.port = 80
            this.environment.color = DEFAULT_COLOR
            this.environment.ssl = useHttps
        }
        this.createEnvironment()
    },
}
</script>
