<template>
    <div class="Crew">
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-toolbar color="green" dark>
                        <v-toolbar-title>Crew</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon> <v-icon>fa-bars</v-icon> </v-btn>
                    </v-toolbar>

                    <v-list two-line>
                        <template v-for="(item, index) in userList">
                            <v-list-tile
                                :key="item.id"
                                avatar
                                ripple
                                @click="toggle(index)"
                            >
                                <v-list-tile-avatar
                                    v-if="item.user.content.photo_url.url"
                                >
                                    <img
                                        :src="item.user.content.photo_url.url"
                                    />
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ item.user.content.firstname.value }}
                                        {{ item.user.content.lastname.value }}
                                    </v-list-tile-title>
                                    <v-list-tile-title>{{
                                        item.id
                                    }}</v-list-tile-title>
                                    <v-list-tile-sub-title
                                        class="text--primary"
                                        >{{ item.id }}</v-list-tile-sub-title
                                    >
                                    <v-list-tile-sub-title>{{
                                        item.id
                                    }}</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-list-tile-action-text>
                                        {{
                                            item.timeSheet.content.in_time.time
                                        }}</v-list-tile-action-text
                                    >

                                    <v-icon
                                        v-if="selected.indexOf(index) < 0"
                                        color="grey lighten-1"
                                    >
                                        fa-star_border
                                    </v-icon>

                                    <v-icon v-else color="yellow darken-2">
                                        fa-star
                                    </v-icon>
                                </v-list-tile-action>
                            </v-list-tile>

                            <v-divider
                                v-if="index + 1 < users.length"
                                :key="index"
                            ></v-divider>
                        </template>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>

        <!-- {{ userList }} -->
        <v-btn block outline warning @click="test()">clock in</v-btn>
        <v-btn block outline warning @click="test2()">clock out</v-btn>
        <v-btn block outline warning @click="test3()"> test</v-btn>
        <v-btn block outline warning @click="test4()"> test store</v-btn>
    </div>
</template>

<script>
/* This Component is a template. */
import { mapState } from 'vuex'
import kuzzle from '../../services/kuzzle'
import { DO_CLOCKIN } from '../../vuex/modules/users/mutation-types'
import {
    // UPDATE_USERLIST,
    // UPDATE_TIMESHEETS,
    DEVICE_USERLIST,
} from '../../vuex/modules/users/mutation-types'

export default {
    name: 'Crew',
    components: {},
    props: {},
    data() {
        return {
            selected: [],
            userList: [],
        }
    },
    computed: {
        ...mapState({
            timeSheets: state => state.users.timeSheets.documents,
            users: state => state.users.users.documents,
        }),
    },
    methods: {
        toggle(index) {
            const i = this.selected.indexOf(index)

            if (i > -1) {
                this.selected.splice(i, 1)
            } else {
                this.selected.push(index)
            }
        },
        async test4() {
            this.$store
                .dispatch(DO_CLOCKIN, '1444044')
                .then(() => {
                    this.onLogin()
                })
                .catch(err => {
                    this.error = err.message
                })
        },
        async test() {
            const args = {
                    controller: 'kuzzle-core-plugin-boilerplate/clockPunch',
                    action: 'clockIn',
                },
                query = {
                    empId: '1444044',
                }
            kuzzle.query(args, query, function(err, res) {
                console.log(err)
                console.log(res.result)
            })
        },
        async test2() {
            const args = {
                    controller: 'kuzzle-core-plugin-boilerplate/clockPunch',
                    action: 'clockOut',
                },
                query = {
                    empId: '1444044',
                }
            kuzzle.query(args, query, function(err, res) {
                console.log(err)
                console.log(res)
            })
        },
        async test3() {
            const args = {
                    controller: 'kuzzle-core-plugin-boilerplate/clockPunch',
                    action: 'test',
                },
                query = {
                    empId: '1444044',
                }
            kuzzle.query(args, query, function(err, res) {
                console.log(err)
                console.log(res.result)
            })
        },
    },

    beforeCreate() {
        // this.$store.dispatch(UPDATE_USERLIST, {});
        // this.$store.dispatch(UPDATE_TIMESHEETS, {})
        this.$store.dispatch(DEVICE_USERLIST, {})
    },
    created() {
        // for (var t of this.timeSheets) {
        //   if (t.content.out_timestamp == "0") {
        //     for (var u of this.users) {
        //       if (u.id == t.content.employee.id) {
        //         var userItem = {
        //           user: u,
        //           timeSheet: t
        //         }
        //         this.userList.push(userItem);
        //       }
        //     }
        //   }
        // }
    },
    watch: {},
}
</script>

<style scoped>
.v-list--two-line .v-list__tile {
    height: 122px;
}
</style>
